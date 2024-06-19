import { io } from "socket.io-client";
import { PUBLIC_RUDIS_URL } from "$env/static/public";

const socket = io(PUBLIC_RUDIS_URL);

export { socket };