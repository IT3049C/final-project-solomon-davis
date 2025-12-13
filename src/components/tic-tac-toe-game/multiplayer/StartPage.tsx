import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const baseFQDN = 'https://game-room-api.fly.dev';

async function apiCreateRoom(initialState: any) {
    const res = await fetch(`${baseFQDN}/api/rooms`, {
    method: 'POST',
    headers: {'Content-Type': 'applications/json' },
    body: JSON.stringify({
        initialState /*: {
            board: [
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ],
            currentPlayer: 'X'

        }*/})
    });
    if (!res.ok) throw new Error ('Failed to create room');
    return res.json() as Promise<{ roomId: string; gameState: any}>;
}

async function apiJoinRoom (roomId: string) {
    const res = await fetch(`${baseFQDN}/api/rooms/${roomId}`)
    if (!res.ok) throw new Error('Room Not Found: not available or does not exist');
    return res.json() as Promise<{ id: string; gameState: any}>;
}

async function apiUpdateRoom(roomId: string, gameState: any) {
    const res = await fetch(`${baseFQDN}/api/rooms/${roomId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({gameState})
    });
    if(!res.ok) throw new Error('Failed to update room');
    return res.json() as Promise<{ id: string; gameState: any}>;
}

export function useGameRoomConnection(options?:  {refetchInterval?: number }/*Number to wait a certain amount of time before fetching again */) {
    const [roomId, setRoomId] = useState<string | null>(null);
    const queryCS = useQueryClient();

    const {data: state, isLoading, error } = useQuery({
        queryKey: ['room', roomId],
        queryFn: () => apiJoinRoom(roomId!).then(room => room.gameState),
        enabled: !!roomId,
        refetchInterval: options?.refetchInterval ?? 800,
    });

    const createRoom = useMutation({
        mutationFn: apiCreateRoom,
        onSuccess: ({roomId: rId, gameState }) =>{
            setRoomId(rId);
            queryCS.setQueryData(['room', rId], gameState);
        }
    });

    const pushState = useMutation({
        mutationFn: async (next: any) => {
            if(!roomId) throw new Error('No room');
            const latest = await apiJoinRoom(roomId);
            const version = (latest.gameState?.version ?? 0) + 1;
            const merged = {...next, version};
            const updated = await apiUpdateRoom(roomId, merged);
            return updated.gameState;
        },
        onSuccess: (gameState) => {
            if(roomId) queryCS.setQueryData(['room', roomId], gameState);
        }
    });
async function safePush(roomId, localState){
  const latest = await apiJoinRoom(roomId);
  if((latest.gameState.version ?? 0) !== (localState.version ?? 0)){
    // Someone else moved. merge or ask user to retry
    return latest.gameState;
  }
  return apiUpdateRoom(roomId, { ...localState, version: (localState.version ?? 0) + 1 });
}

    return {
        roomId, state, isLoading, error, setRoomId, 
        createRoom: (initialState: any) => createRoom.mutateAsync(initialState),
        pushState: (next: any) => pushState.mutateAsync(next),
    };

}

/*<
Previous Code I Did Before Above Was Done (for comparison and improvement)
const [roomId, setRoomId] = useState()
function CreateRoom() {
fetch('https://game-room-api.fly.dev/api/rooms', {
  method: 'POST',
  headers: {'Content-Type': 'applications/json' 
},
    body: JSON.stringify({
        initialState: {
            board: [
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ],
            currentPlayer: 'X'

        }
    })

}).then(response => response.json())
    .then(data => {
        const sendroomId = data.sendroomId;
        console.log(`Share this code with a friend to play with them: ${sendroomId}`);
        setRoomId(sendroomId)
});
}
function JoinGameRoom() {
    const joinRoomId = ""
    if (joinRoomId != roomId) {
        console.log("Sorry, but the code you have used has a room that is unavailable or does not exist");
    }
    fetch(`https://game-room-api.fly.dev/api/rooms/${roomId}`)
        .then(response => response.json())
        .then(data => {
            const gameState = data.gameState;
            console.log('Current game state: ', gameState)
        })
}

function UpdateGame() {
    const currentRoom = roomId;
    const updatedGameState = {
        board: [
            ['X', null, null],
            [null, null, null],
            [null, null, null]
        ],
        currentPlayer: 'O'
    };
    fetch(`https://game-room-api.fly.dev/api/rooms/${currentRoom}`, {
        method: 'PUT',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            gameState: updatedGameState
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Updated game state: ', data.gameState)
    });
}
*/