import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Nat8 "mo:core/Nat8";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Storage "blob-storage/Storage";

module {
  type Credentials = {
    phoneNumber : Text;
    hashedPassword : Text;
  };

  type BloodType = {
    #aPositive;
    #aNegative;
    #bPositive;
    #bNegative;
    #abPositive;
    #abNegative;
    #oPositive;
    #oNegative;
  };

  type EmergencyContact = {
    name : Text;
    phone : Text;
    relationship : Text;
  };

  type Allergy = {
    name : Text;
    severity : Text;
    reaction : Text;
  };

  type UserProfile = {
    name : Text;
    email : ?Text;
    location : ?Text;
    company : ?Text;
    website : ?Text;
    bio : ?Text;
    image : ?Text;
    dateOfBirth : ?Int;
    bloodType : ?BloodType;
    allergies : [Allergy];
    emergencyContact : ?EmergencyContact;
  };

  type MLInput = {
    age : Nat8;
    gender : Text;
    cholesterol : Nat8;
    bloodPressure : Nat8;
    bmi : Nat8;
    heartRate : Nat8;
    smokingStatus : Text;
    diabetesStatus : Text;
    exerciseFrequency : Nat8;
    medicationAdherence : Text;
    saltIntake : Text;
    stressLevel : Text;
    sleepQuality : Text;
  };

  type MLPrediction = {
    riskLevel : Text;
    confidence : Nat8;
    modelVersion : Text;
    timestamp : Int;
    featureWeights : [(Text, Nat8)];
  };

  type MedicalFileMetadata = {
    id : Text;
    filename : Text;
    size : Nat;
    uploadedAt : Time.Time;
    contentType : ?Text;
  };

  type OldActor = {
    credentials : Map.Map<Principal, Credentials>;
    userProfiles : Map.Map<Principal, UserProfile>;
    mlPredictions : Map.Map<Principal, MLPrediction>;
    medicalFiles : Map.Map<Principal, Map.Map<Text, Storage.ExternalBlob>>;
    medicalFileMetadata : Map.Map<Principal, Map.Map<Text, MedicalFileMetadata>>;
  };

  type NewActor = {
    credentials : Map.Map<Principal, Credentials>;
    userProfiles : Map.Map<Principal, UserProfile>;
    mlPredictions : Map.Map<Principal, MLPrediction>;
    medicalFiles : Map.Map<Principal, Map.Map<Text, Storage.ExternalBlob>>;
    medicalFileMetadata : Map.Map<Principal, Map.Map<Text, MedicalFileMetadata>>;
  };

  public func run(old : OldActor) : NewActor {
    old;
  };
};
