import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Allergy {
    name: string;
    severity: string;
    reaction: string;
}
export interface MLInput {
    age: number;
    bmi: number;
    sleepQuality: string;
    saltIntake: string;
    stressLevel: string;
    bloodPressure: number;
    exerciseFrequency: number;
    heartRate: number;
    gender: string;
    smokingStatus: string;
    medicationAdherence: string;
    diabetesStatus: string;
    cholesterol: number;
}
export interface EmergencyContact {
    relationship: string;
    name: string;
    phone: string;
}
export interface MLPrediction {
    featureWeights: Array<[string, number]>;
    modelVersion: string;
    timestamp: bigint;
    confidence: number;
    riskLevel: string;
}
export interface UserProfile {
    bio?: string;
    bloodType?: BloodType;
    dateOfBirth?: bigint;
    name: string;
    emergencyContact?: EmergencyContact;
    email?: string;
    website?: string;
    company?: string;
    image?: string;
    allergies: Array<Allergy>;
    location?: string;
}
export enum BloodType {
    aNegative = "aNegative",
    oPositive = "oPositive",
    abPositive = "abPositive",
    bPositive = "bPositive",
    aPositive = "aPositive",
    oNegative = "oNegative",
    abNegative = "abNegative",
    bNegative = "bNegative"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllPredictions(): Promise<Array<[Principal, MLPrediction]>>;
    getCallerMLPrediction(): Promise<MLPrediction | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFeatureImportance(): Promise<Array<[string, number]>>;
    getUserMLPrediction(user: Principal): Promise<MLPrediction | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    runMLPrediction(input: MLInput): Promise<MLPrediction>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
