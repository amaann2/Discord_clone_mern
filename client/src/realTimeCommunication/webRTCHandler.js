import { setLocalStream, setRemoteStream } from "../store/actions/roomActions";
import store from "../store/store";
import Peer from "simple-peer";
import { signalPeerData } from "./socketConnection";

const getConfiguration = () => {
  const turnIceServers = null;
  if (turnIceServers) {
    // TODO use Turn server credentials
  } else {
    console.warn("Using only STUN server");
    return {
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:global.stun.twilio.com:3478",
          ],
        },
      ],
    };
  }
};

const onlyAudioContraints = {
  audio: true,
  video: false,
};

const defaultContraints = {
  audio: true,
  video: true,
};

export const getLocalStreamPreview = (audioOnly = false, callbackFunc) => {
  const contraints = audioOnly ? onlyAudioContraints : defaultContraints;
  navigator.mediaDevices
    .getUserMedia(contraints)
    .then((stream) => {
      store.dispatch(setLocalStream(stream));
      callbackFunc();
    })
    .catch((err) => {
      console.log(err);
      console.log("Cannot get an access to localstream");
    });
};

let peers = {};
export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  const localStream = store.getState().room.localStream;

  if (isInitiator) {
    console.log("preparing new peer connection as initator");
  } else {
    console.log("preparing new peer connection as not initator");
  }

  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: getConfiguration(),
    stream: localStream,
  });

  peers[connUserSocketId].on("signal", (data) => {
    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };

    signalPeerData(signalData);
  });

  peers[connUserSocketId].on("stream", (remoteStream) => {
    //TODO
    // add new remote stream to our server store
    console.log("remote stream came from other user");
    console.log("direct connection has been established");

    remoteStream.connUserSocketId = connUserSocketId;

    addNewRemoteStream(remoteStream);
  });
};

export const handleSignalingData = (data) => {
  const { connUserSocketId, signal } = data;
  if (peers[connUserSocketId]) {
    peers[connUserSocketId].signal(signal);
  }
};
const addNewRemoteStream = (remoteStream) => {
  const remoteStreams = store.getState().room.remoteStreams;
  const newRemoteStreams = [...remoteStreams, remoteStream];

  store.dispatch(setRemoteStream(newRemoteStreams));
};
