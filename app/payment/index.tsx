import { runSSE } from '@/api/adk';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeIn,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming
} from 'react-native-reanimated';

const Payment = () => {
  const {session_id} = useLocalSearchParams<{session_id?: string}>()

  const router = useRouter()
  const [paymentState, setPaymentState] = useState('idle'); // idle, loading, success
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  
  // Reanimated shared values
  const formOpacity = useSharedValue(1);
  const buttonScale = useSharedValue(1);
  const successScale = useSharedValue(0);
  const successOpacity = useSharedValue(0);
  const loadingRotation = useSharedValue(0);

  const plans = {
    basic: { 
      name: 'Basic Plan', 
      price: 9.99, 
      features: ['Register as a Free Zone Company (FZCO) or Public Limited Company (PLC).', 'Obtain a distinct license number for clear recognition.', 'All necessary legal and business documents managed and verified.', 'Lease strategically located premises within the Free Zone.', 'Benefit from streamlined approval processes and official licensing.'] 
    }
  };

  const resetAnimations = () => {
    formOpacity.value = 1;
    buttonScale.value = 1;
    successScale.value = 0;
    successOpacity.value = 0;
    loadingRotation.value = 0;
  };

  const handlePayment = async () => {
    setPaymentState('loading');
    
    // Button press animation
    buttonScale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
    
    // Loading rotation animation
    loadingRotation.value = withTiming(360, { duration: 1000 });
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Transition to success state
    formOpacity.value = withTiming(0, { duration: 300 }, () => {
      runOnJS(setPaymentState)('success');
    });
    
    // Success animations
    successOpacity.value = withTiming(1, { duration: 500 });
    successScale.value = withSequence(
      withTiming(1.2, { duration: 200 }),
      withSpring(1, { damping: 8, stiffness: 100 })
    );
    
    // Reset after 4 seconds
    setTimeout(() => {
      successOpacity.value = withTiming(0, { duration: 300 }, () => {
        runOnJS(setPaymentState)('idle');
        runOnJS(resetAnimations)();
        runOnJS(() => {
          if (session_id) {
            runSSE(session_id, {
              role: 'maybe_user',
              'parts': [{
                'text': 'success'
              }]
            }).then(() => {
              router.back()
            })
          }
        })()
      });
    }, 4000);
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(' ') : '';
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  // Animated styles
  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: formOpacity.value,
      transform: [
        {
          translateY: interpolate(formOpacity.value, [0, 1], [20, 0])
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

  const renderPlanCard = (planKey: string, plan: {
    name: string;
    price: number;
    features: string[];
  }) => (
    <TouchableOpacity
      key={planKey}
      className={`bg-white rounded-xl p-4 mb-3 border-2 shadow-sm ${
        selectedPlan === planKey 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-200'
      }`}
      onPress={() => setSelectedPlan(planKey)}
      activeOpacity={0.7}
    >
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-base font-semibold text-gray-700">{plan.name}</Text>
        <Text className="text-2xl font-bold text-gray-900">${plan.price}</Text>
      </View>
      <View className="space-y-1">
        {plan.features.map((feature, index) => (
          <View key={index} className="flex-row items-center mb-1">
            <Ionicons name="checkmark-circle" size={16} color="#10B981" />
            <Text className="text-sm text-gray-600 ml-2">{feature}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  const renderPaymentForm = () => (
    <Animated.View entering={FadeIn.duration(400).damping(40).stiffness(80)} style={formAnimatedStyle} className="flex-1 px-5">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="items-center mb-8">
          <Text className="text-2xl font-bold text-gray-900">Complete Your Purchase</Text>
        </View>

        {/* Plan Selection */}
        <View className="mb-6">
          {Object.entries(plans).map(([key, plan]) => renderPlanCard(key, plan))}
        </View>

        {/* Payment Information */}
        <View className="mb-6">
          <View className="flex-row items-center mb-4">
            <Ionicons name="card" size={20} color="#374151" />
            <Text className="text-lg font-semibold text-gray-700 ml-2">Payment Information</Text>
          </View>
          
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">Card Number</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-3 text-base bg-white"
                value={cardNumber}
                onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                placeholder="1234 5678 9012 3456"
                keyboardType="numeric"
                maxLength={19}
              />
            </View>
            
            <View className="flex-row mb-4">
              <View className="flex-1 mr-3">
                <Text className="text-sm font-medium text-gray-700 mb-2">Expiry Date</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg px-3 py-3 text-base bg-white"
                  value={expiryDate}
                  onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                  placeholder="MM/YY"
                  keyboardType="numeric"
                  maxLength={5}
                />
              </View>
              
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-700 mb-2">CVV</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg px-3 py-3 text-base bg-white"
                  value={cvv}
                  onChangeText={setCvv}
                  placeholder="123"
                  keyboardType="numeric"
                  maxLength={3}
                  secureTextEntry
                />
              </View>
            </View>
            
            <View className="mb-0">
              <Text className="text-sm font-medium text-gray-700 mb-2">Cardholder Name</Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-3 text-base bg-white"
                value={cardholderName}
                onChangeText={setCardholderName}
                placeholder="John Doe"
                autoCapitalize="words"
              />
            </View>
          </View>
        </View>

        {/* Order Summary */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-700 mb-4">Order Summary</Text>
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <View className="flex-row justify-between mb-2">
              <Text className="text-sm text-gray-600">{plans[selectedPlan].name}</Text>
              <Text className="text-sm font-medium text-gray-700">${plans[selectedPlan].price}</Text>
            </View>
            <View className="flex-row justify-between mb-3">
              <Text className="text-sm text-gray-600">Tax</Text>
              <Text className="text-sm font-medium text-gray-700">${(plans[selectedPlan].price * 0.1).toFixed(2)}</Text>
            </View>
            <View className="h-px bg-gray-200 my-3" />
            <View className="flex-row justify-between">
              <Text className="text-base font-semibold text-gray-700">Total</Text>
              <Text className="text-xl font-bold text-gray-900">${(plans[selectedPlan].price * 1.1).toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Security Notice */}
        <View className="flex-row items-center justify-center mb-5">
          <Ionicons name="shield-checkmark" size={16} color="#6B7280" />
          <Text className="text-xs text-gray-500 ml-2">Your payment information is secure and encrypted</Text>
        </View>

        {/* Pay Button */}
        <Animated.View style={buttonAnimatedStyle}>
          <TouchableOpacity
            className={`rounded-xl p-4 items-center shadow-lg ${
              paymentState === 'loading' ? 'bg-gray-400' : 'bg-blue-600'
            }`}
            onPress={handlePayment}
            disabled={paymentState === 'loading'}
            activeOpacity={0.8}
          >
            {paymentState === 'loading' ? (
              <View className="flex-row items-center">
                <Animated.View style={loadingAnimatedStyle}>
                  <ActivityIndicator size="small" color="#FFFFFF" />
                </Animated.View>
                <Text className="text-white text-base font-semibold ml-2">Processing...</Text>
              </View>
            ) : (
              <View className="flex-row items-center">
                <Ionicons name="lock-closed" size={20} color="#FFFFFF" />
                <Text className="text-white text-base font-semibold ml-2">Pay ${(plans[selectedPlan].price * 1.1).toFixed(2)}</Text>
              </View>
            )}
          </TouchableOpacity>
        </Animated.View>

        {/* Terms */}
        <Text className="text-xs text-gray-500 text-center mt-4 leading-4">
          By proceeding, you agree to our Terms of Service and Privacy Policy
        </Text>
      </ScrollView>
    </Animated.View>
  );

  const renderSuccessState = () => (
    <Animated.View style={successAnimatedStyle} className="flex-1 justify-center items-center px-10">
      <View className="mb-5">
        <Ionicons name="checkmark-circle" size={80} color="#10B981" />
      </View>
      <Text className="text-2xl font-bold text-gray-900 mb-3 text-center">Payment Successful!</Text>
      <Text className="text-base text-gray-600 text-center leading-6">
        Thank you for your purchase. You'll be returned to the agent chat.
      </Text>
    </Animated.View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50 pt-8">
      {paymentState === 'success' ? renderSuccessState() : renderPaymentForm()}
    </SafeAreaView>
  );
};

export default Payment;