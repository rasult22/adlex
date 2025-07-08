import queryClient from "@/queries/client";
import { fetch } from "expo/fetch";
const app_name = "adk";
const user_id = "user";
// const base_url = 'http://192.168.123.33:8000/213' // windows
const base_url = 'https://agent.adlex.azamat.ai'  // mac

export type CreateSessionResponse = {
  appName: string,
  events: [],
  id: string,
  lastUpdateTime: number,
  state: {},
  userId: string
}
export async function createSession() {
  return await fetch(
    `${base_url}/apps/${app_name}/users/${user_id}/sessions`,
    {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: '',
    }
  ).then((x) => x.json() as Promise<CreateSessionResponse>);
}

export type SessionData = {
  userId: string;
  appName: string;
  id: string,
  lastUpdateTime: number,
  state: {},
  events: AppMessageEvent[];
};

export type AppMessageEvent = {
  author: "user" | "root_agent" | 'apply_agent' | string;
  actions?: {};
  invocationId: string;
  id?: string;
  content: AppMessageContent
}

export type AppMessageContent = {
  role?: string,
  parts: {
    text?: string;
    functionCall?: {
      args: {agent_name: string},
      id: string,
      name: string
    };
    functionResponse?: {
      response: {result: string},
      id: string,
      name: string
    };
  }[];
}
export async function getSessionData(session_id: string) {
  return await fetch(
    `${base_url}/apps/${app_name}/users/${user_id}/sessions/${session_id}`,
    {
      method: "GET",
    }
  ).then((x) => x.json() as Promise<SessionData>);
}

export async function runSSE(
  session_id: string,
  newMessage: {
    role: string;
    parts: { text: string }[];
  }
) {
  const payload = {
    appName: app_name,
    newMessage,
    userId: user_id,
    streaming: true,
    sessionId: session_id,
  };
  const response = await fetch(`${base_url}/run_sse`, {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      "Accept": 'text/event-stream'
    },
    method: "POST",
  });
  const reader = response.body?.getReader();
  if (!reader) return;
  const decoder = new TextDecoder('utf-8');
  let lastData = ``;
  let parts = ''
  const read = () => {
    reader?.read().then(({done, value}) => {
      // is loading true
      if (done) {
        return
      }
      const chunk = decoder.decode(value, {stream: true})
      lastData += chunk;

      try {
        const lines = lastData.split(/\r?\n/).filter((line) => line.startsWith('data:'));
        lines.forEach((line) => {
          const data = line.replace(/^data:\s*/, '')
          try {
            const json = JSON.parse(data);
            if (json.partial) {
              parts += json.content.parts[0].text
              updateQueryData(json, session_id, parts)
            } else {
              updateQueryData(json, session_id, json.content.parts[0].text)
            }
          } catch (e) {
            console.log('error parsing data')
          }
        })
        lastData = '';
      } catch (e){
        if (e instanceof SyntaxError) {
          read();
        }
      }
      read();
    })
    .catch(err => {
      console.error(err)
    })
  }
  read()
}


function updateQueryData (json: any, session_id: string, parts: string) {
    queryClient.setQueryData<SessionData>(['chat', session_id], (oldData) => {
      if (!oldData) return oldData
      const found = oldData.events.find(e => (e.invocationId === json.invocationId && e.author !== 'user' && !e.content.parts[0].functionCall && !e.content.parts[0].functionResponse))
      // if event is already exist, update text
      if (found) {
        return {
          ...oldData,
          events: oldData.events.map(e => {
            if (e.author === 'user') {
              return e;
            } 

            if (e.invocationId === json.invocationId && !e.content.parts[0].functionCall && !e.content.parts[0].functionResponse) {

              return {
                ...json,
                content: {
                  parts: [{
                    text: parts,
                  }]
                }
              }
            }
            return e
          })
        }
      } else {
        if(json.content.parts[0].functionCall) {
            return {
            ...oldData,
            events: [...oldData.events, {
              ...json,
              content: {
                parts: [{
                  functionCall: json.content.parts[0].functionCall
                }]
              }
            }]
          }
        }
        if(json.content.parts[0].functionResponse) {
            return {
            ...oldData,
            events: [...oldData.events, {
              ...json,
              content: {
                parts: [{
                  functionResponse: json.content.parts[0].functionResponse
                }]
              }
            }]
          }
        }
        return {
          ...oldData,
          events: [...oldData.events, {
            ...json,
            content: {
              parts: [{
                text: parts
              }]
            }
          }]
        }
      }
    })
}