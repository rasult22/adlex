import { runSSE } from '@/api/adk';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
  SlideInRight,
  SlideOutLeft,
} from 'react-native-reanimated';

const KYCVerification = () => {
  const { session_id } = useLocalSearchParams<{ session_id?: string }>();
  const router = useRouter();
  
  const [kycState, setKycState] = useState('info'); // info, verification, loading, checking, success
  const [currentStep, setCurrentStep] = useState(1);
  const [verificationProgress, setVerificationProgress] = useState(0);
  
  // Reanimated shared values
  const containerOpacity = useSharedValue(1);
  const buttonScale = useSharedValue(1);
  const successScale = useSharedValue(0);
  const successOpacity = useSharedValue(0);
  const loadingRotation = useSharedValue(0);
  const progressWidth = useSharedValue(0);
  const checkingPulse = useSharedValue(1);

  const kycSteps = [
    {
      id: 1,
      title: 'Identity Document',
      description: 'Upload a clear photo of your government-issued ID',
      icon: 'document-text',
      completed: false,
    },
    {
      id: 2,
      title: 'Selfie Verification',
      description: 'Take a selfie to verify your identity',
      icon: 'camera',
      completed: false,
    },
    {
      id: 3,
      title: 'Address Proof',
      description: 'Upload a utility bill or bank statement',
      icon: 'home',
      completed: false,
    },
  ];

  const resetAnimations = () => {
    containerOpacity.value = 1;
    buttonScale.value = 1;
    successScale.value = 0;
    successOpacity.value = 0;
    loadingRotation.value = 0;
    progressWidth.value = 0;
    checkingPulse.value = 1;
  };

  const startVerification = () => {
    setKycState('verification');
    buttonScale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
  };

  const simulateDocumentUpload = async (stepId: number) => {
    setKycState('loading');
    loadingRotation.value = withTiming(360 * 3, { duration: 2000 });
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update progress
    const newProgress = (stepId / kycSteps.length) * 100;
    setVerificationProgress(newProgress);
    progressWidth.value = withTiming(newProgress, { duration: 500 });
    
    if (stepId < kycSteps.length) {
      setCurrentStep(stepId + 1);
      setKycState('verification');
      loadingRotation.value = 0;
    } else {
      // All steps completed, start checking
      setKycState('checking');
      startCheckingAnimation();
    }
  };

  const startCheckingAnimation = () => {
    checkingPulse.value = withSequence(
      withTiming(1.1, { duration: 800 }),
      withTiming(1, { duration: 800 })
    );
    
    // Simulate verification checking
    setTimeout(() => {
      completeVerification();
    }, 4000);
  };

  const completeVerification = () => {
    containerOpacity.value = withTiming(0, { duration: 300 }, () => {
      runOnJS(setKycState)('success');
    });
    
    // Success animations
    successOpacity.value = withTiming(1, { duration: 500 });
    successScale.value = withSequence(
      withTiming(1.2, { duration: 200 }),
      withSpring(1, { damping: 8, stiffness: 100 })
    );
    
    // Auto-complete after 4 seconds
    setTimeout(() => {
      handleKycComplete();
    }, 4000);
  };

  const handleKycComplete = () => {
    if (session_id) {
      runSSE(session_id, {
        role: 'maybe_user',
        parts: [{
          text: 'kyc_verification_completed'
        }]
      }).then(() => {
        router.back();
      });
    } else {
      // Custom action when no session_id - you can customize this
      console.log('KYC Verification completed - Custom action needed');
      router.back();
    }
  };

  // Animated styles
  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: containerOpacity.value,
      transform: [
        {
          translateY: interpolate(containerOpacity.value, [0, 1], [20, 0])
        }
      ]
    };
  });

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }]
    };
  });

  const successAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: successOpacity.value,
      transform: [
        { scale: successScale.value },
        {
          translateY: interpolate(successOpacity.value, [0, 1], [50, 0])
        }
      ]
    };
  });

  const loadingAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${loadingRotation.value}deg` }
      ]
    };
  });

  const progressAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progressWidth.value}%`,
    };
  });

  const checkingAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: checkingPulse.value }]
    };
  });

  const renderInfoScreen = () => (
    <Animated.View 
      entering={FadeIn.duration(400)} 
      style={containerAnimatedStyle} 
      className="flex-1 px-5"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="items-center mb-8">
          <View className="bg-blue-100 rounded-full p-4 mb-4">
            <Ionicons name="shield-checkmark" size={48} color="#3B82F6" />
          </View>
          <Text className="text-2xl font-bold text-gray-900 text-center">
            KYC Verification
          </Text>
          <Text className="text-base text-gray-600 text-center mt-2">
            Verify your identity to access all features
          </Text>
        </View>

        {/* Benefits */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-gray-700 mb-4">Why verify your identity?</Text>
          <View className="space-y-3">
            {[
              { icon: 'lock-closed', text: 'Enhanced security for your account' },
              { icon: 'trending-up', text: 'Access to premium features' },
              { icon: 'checkmark-circle', text: 'Faster transaction processing' },
              { icon: 'shield', text: 'Compliance with regulations' },
            ].map((benefit, index) => (
              <View key={index} className="flex-row items-center bg-white rounded-xl p-4 shadow-sm">
                <View className="bg-green-100 rounded-full p-2 mr-3">
                  <Ionicons name={benefit.icon as any} size={20} color="#10B981" />
                </View>
                <Text className="text-sm text-gray-700 flex-1">{benefit.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Requirements */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-gray-700 mb-4">What you'll need:</Text>
          <View className="bg-blue-50 rounded-xl p-4">
            {kycSteps.map((step, index) => (
              <View key={step.id} className="flex-row items-center mb-3 last:mb-0">
                <View className="bg-blue-100 rounded-full p-2 mr-3">
                  <Ionicons name={step.icon as any} size={16} color="#3B82F6" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-medium text-gray-700">{step.title}</Text>
                  <Text className="text-xs text-gray-500">{step.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Time estimate */}
        <View className="bg-yellow-50 rounded-xl p-4 mb-8">
          <View className="flex-row items-center">
            <Ionicons name="time" size={20} color="#F59E0B" />
            <Text className="text-sm font-medium text-gray-700 ml-2">
              Estimated time: 3-5 minutes
            </Text>
          </View>
        </View>

        {/* Start Button */}
        <Animated.View style={buttonAnimatedStyle}>
          <TouchableOpacity
            className="bg-blue-600 rounded-xl p-4 items-center shadow-lg"
            onPress={startVerification}
            activeOpacity={0.8}
          >
            <View className="flex-row items-center">
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
              <Text className="text-white text-base font-semibold ml-2">Start Verification</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Security notice */}
        <View className="flex-row items-center justify-center mt-4">
          <Ionicons name="shield-checkmark" size={16} color="#6B7280" />
          <Text className="text-xs text-gray-500 ml-2 text-center">
            Your documents are encrypted and securely processed
          </Text>
        </View>
      </ScrollView>
    </Animated.View>
  );

  const renderVerificationScreen = () => (
    <Animated.View 
      entering={SlideInRight.duration(300)} 
      exiting={SlideOutLeft.duration(300)}
      style={containerAnimatedStyle} 
      className="flex-1 px-5"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Progress Bar */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-sm font-medium text-gray-700">Progress</Text>
            <Text className="text-sm text-gray-500">{Math.round(verificationProgress)}%</Text>
          </View>
          <View className="bg-gray-200 rounded-full h-2">
            <Animated.View 
              style={progressAnimatedStyle}
              className="bg-blue-600 rounded-full h-2"
            />
          </View>
        </View>

        {/* Current Step */}
        <View className="items-center mb-8">
          <View className="bg-blue-100 rounded-full p-4 mb-4">
            <Ionicons name={kycSteps[currentStep - 1]?.icon as any} size={48} color="#3B82F6" />
          </View>
          <Text className="text-xl font-bold text-gray-900 text-center">
            {kycSteps[currentStep - 1]?.title}
          </Text>
          <Text className="text-base text-gray-600 text-center mt-2">
            {kycSteps[currentStep - 1]?.description}
          </Text>
        </View>

        {/* Upload Area */}
        <View className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 items-center mb-8">
          <Ionicons name="cloud-upload" size={48} color="#9CA3AF" />
          <Text className="text-base font-medium text-gray-700 mt-4 text-center">
            Tap to upload or take a photo
          </Text>
          <Text className="text-sm text-gray-500 mt-2 text-center">
            Supported formats: JPG, PNG, PDF
          </Text>
        </View>

        {/* Upload Button */}
        <Animated.View style={buttonAnimatedStyle}>
          <TouchableOpacity
            className="bg-blue-600 rounded-xl p-4 items-center shadow-lg mb-4"
            onPress={() => simulateDocumentUpload(currentStep)}
            activeOpacity={0.8}
          >
            <View className="flex-row items-center">
              <Ionicons name="camera" size={20} color="#FFFFFF" />
              <Text className="text-white text-base font-semibold ml-2">Upload Document</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Skip Button */}
        <TouchableOpacity
          className="items-center py-3"
          onPress={() => simulateDocumentUpload(currentStep)}
          activeOpacity={0.7}
        >
          <Text className="text-gray-500 text-sm">Skip for now (Demo)</Text>
        </TouchableOpacity>
      </ScrollView>
    </Animated.View>
  );

  const renderLoadingScreen = () => (
    <Animated.View 
      entering={FadeIn.duration(300)}
      className="flex-1 justify-center items-center px-10"
    >
      <Animated.View style={loadingAnimatedStyle} className="mb-6">
        <View className="bg-blue-100 rounded-full p-6">
          <Ionicons name="cloud-upload" size={48} color="#3B82F6" />
        </View>
      </Animated.View>
      <Text className="text-xl font-bold text-gray-900 mb-3 text-center">
        Uploading Document
      </Text>
      <Text className="text-base text-gray-600 text-center leading-6 mb-4">
        Please wait while we securely process your document...
      </Text>
      <ActivityIndicator size="large" color="#3B82F6" />
    </Animated.View>
  );

  const renderCheckingScreen = () => (
    <Animated.View 
      entering={FadeIn.duration(300)}
      className="flex-1 justify-center items-center px-10"
    >
      <Animated.View style={checkingAnimatedStyle} className="mb-6">
        <View className="bg-yellow-100 rounded-full p-6">
          <Ionicons name="search" size={48} color="#F59E0B" />
        </View>
      </Animated.View>
      <Text className="text-xl font-bold text-gray-900 mb-3 text-center">
        Verifying Information
      </Text>
      <Text className="text-base text-gray-600 text-center leading-6 mb-4">
        We're checking your documents against our security database...
      </Text>
      <View className="flex-row items-center">
        <ActivityIndicator size="small" color="#F59E0B" />
        <Text className="text-sm text-gray-500 ml-2">This may take a few moments</Text>
      </View>
    </Animated.View>
  );

  const renderSuccessScreen = () => (
    <Animated.View 
      style={successAnimatedStyle} 
      className="flex-1 justify-center items-center px-10"
    >
      <View className="mb-6">
        <Ionicons name="checkmark-circle" size={80} color="#10B981" />
      </View>
      <Text className="text-2xl font-bold text-gray-900 mb-3 text-center">
        Verification Complete!
      </Text>
      <Text className="text-base text-gray-600 text-center leading-6 mb-6">
        Your identity has been successfully verified. You now have access to all features.
      </Text>
      <View className="bg-green-50 rounded-xl p-4 w-full">
        <View className="flex-row items-center justify-center">
          <Ionicons name="shield-checkmark" size={20} color="#10B981" />
          <Text className="text-sm font-medium text-green-700 ml-2">Account Verified</Text>
        </View>
      </View>
    </Animated.View>
  );

  const renderCurrentScreen = () => {
    switch (kycState) {
      case 'info':
        return renderInfoScreen();
      case 'verification':
        return renderVerificationScreen();
      case 'loading':
        return renderLoadingScreen();
      case 'checking':
        return renderCheckingScreen();
      case 'success':
        return renderSuccessScreen();
      default:
        return renderInfoScreen();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 pt-8">
      {/* Header */}
      {kycState !== 'success' && (
        <View className="flex-row items-center justify-between px-5 mb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-white rounded-full p-2 shadow-sm"
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-700">KYC Verification</Text>
          <View className="w-10" />
        </View>
      )}
      
      {renderCurrentScreen()}
    </SafeAreaView>
  );
};

export default KYCVerification;