import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const api = axios.create({
  baseURL: "https://api.tensorboy.com"
});

export const checkSubscriber = async (email: string) => {
  try {
    const { data } = await api.post("/check-subscriber", { email });
    console.log("Subscriber check response:", data);
    if(data.error){
        console.error("Error checking subscriber:", data.error);
        throw new Error(data.error);
    }
    return data.exists;
  } catch (err) {
    console.error("Error checking subscriber:", err);
    throw err;
  }
};

export const addToWaitlist = async (email: string, ig_username: string, name : string) => {
  try {
    const { data } = await api.post("/add-to-waitlist", { email, ig_username, totalVotes : 1, voteGiven : 0, name });
    console.log("Waitlist addition response:", data);
    if(data.error){
        console.error("Error adding to waitlist:", data.error);
        throw new Error(data.error);
    }
    return data.success;
  } catch (err) {
    console.error("Error adding to waitlist:", err);
    throw err;
  }
};

export const leaderboard = async () => {
  try {
    const { data } = await api.get("/leaderboard");
    console.log("Leaderboard data:", data);
    if(data.error){
        console.error("Error fetching leaderboard:", data.error);
        throw new Error(data.error);
    }
    return data;
  } catch (err) {
    console.error("Error fetching leaderboard:", err);
    throw err;
  }
};

export const addVote = async (email: string, contestant: string) => {
    const { data } = await api.post("/add-vote", { email, contestant });
    console.log("Vote addition response:", data);
    if(data.error){
        console.error("Error adding vote:", data.error);
        throw new Error(data.error);
    }
    return data.success;
};

export const getContestant = async (contestantId: string) => {
  try {
    const { data } = await api.get(`/get-contestant?id=${contestantId}`);
    console.log("Contestant data:", data);
    if(data.error){
        console.error("Error fetching contestant:", data.error);
        throw new Error(data.error);
    }
    return data;
  } catch (err) {
    console.error("Error fetching contestant:", err);
    throw err;
  }
}