import Map "mo:core/Map";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Nat8 "mo:core/Nat8";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  public type BloodType = {
    #aPositive;
    #aNegative;
    #bPositive;
    #bNegative;
    #abPositive;
    #abNegative;
    #oPositive;
    #oNegative;
  };

  public type EmergencyContact = {
    name : Text;
    phone : Text;
    relationship : Text;
  };

  public type Allergy = {
    name : Text;
    severity : Text;
    reaction : Text;
  };

  public type UserProfile = {
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

  public type MLInput = {
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

  public type MLPrediction = {
    riskLevel : Text;
    confidence : Nat8;
    modelVersion : Text;
    timestamp : Int;
    featureWeights : [(Text, Nat8)];
  };

  public type MedicalFileMetadata = {
    id : Text;
    filename : Text;
    size : Nat;
    uploadedAt : Time.Time;
    contentType : ?Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let mlPredictions = Map.empty<Principal, MLPrediction>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func runMLPrediction(input : MLInput) : async MLPrediction {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can request predictions");
    };

    let riskScore = calculateRiskScore(input);
    let riskLevel = determineRiskLevel(riskScore);
    let featureWeights = calculateFeatureWeights(input);

    let prediction : MLPrediction = {
      riskLevel;
      confidence = 90;
      modelVersion = "1.0.0";
      timestamp = Time.now();
      featureWeights;
    };

    mlPredictions.add(caller, prediction);
    prediction;
  };

  public query ({ caller }) func getCallerMLPrediction() : async ?MLPrediction {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view predictions");
    };
    mlPredictions.get(caller);
  };

  public query ({ caller }) func getUserMLPrediction(user : Principal) : async ?MLPrediction {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own prediction");
    };
    mlPredictions.get(user);
  };

  public query ({ caller }) func getAllPredictions() : async [(Principal, MLPrediction)] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all predictions");
    };
    mlPredictions.toArray();
  };

  public query ({ caller }) func getFeatureImportance() : async [(Text, Nat8)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view feature importance");
    };
    calculateGlobalFeatureImportance();
  };

  func calculateRiskScore(input : MLInput) : Nat8 {
    let ageScore = input.age * 2;
    let cholesterolScore = input.cholesterol * 3;
    let bloodPressureScore = input.bloodPressure * 2;
    let bmiScore = input.bmi * 2;
    let heartRateScore = input.heartRate * 1;

    let smokingScore = switch (input.smokingStatus) {
      case ("current") { 20 };
      case ("previous") { 10 };
      case (_) { 0 };
    };

    let diabetesScore = switch (input.diabetesStatus) {
      case ("yes") { 15 };
      case ("no") { 0 };
      case (_) { 0 };
    };

    let exerciseScore = if (input.exerciseFrequency >= 5) { 0 } else if (input.exerciseFrequency >= 3) {
      5;
    } else { 10 };

    let medicationScore = switch (input.medicationAdherence) {
      case ("good") { 0 };
      case ("moderate") { 5 };
      case (_) { 10 };
    };

    let nat16toNat8 = func(value : Nat) : Nat8 {
      if (value > 255) { 255 } else { Nat8.fromNat(value) };
    };

    nat16toNat8(
      ageScore.toNat()
      + cholesterolScore.toNat()
      + bloodPressureScore.toNat()
      + bmiScore.toNat()
      + heartRateScore.toNat()
      + smokingScore.toNat()
      + diabetesScore.toNat()
      + exerciseScore
      + medicationScore.toNat()
    );
  };

  func determineRiskLevel(riskScore : Nat8) : Text {
    if (riskScore <= 40) {
      "Low";
    } else if (riskScore <= 80) {
      "Moderate";
    } else {
      "High";
    };
  };

  func calculateFeatureWeights(input : MLInput) : [(Text, Nat8)] {
    [
      ("age", 15),
      ("cholesterol", 20),
      ("bloodPressure", 20),
      ("bmi", 15),
      ("heartRate", 10),
      ("smokingStatus", 10),
      ("diabetesStatus", 10),
    ];
  };

  func calculateGlobalFeatureImportance() : [(Text, Nat8)] {
    [
      ("age", 18),
      ("cholesterol", 22),
      ("bloodPressure", 20),
      ("bmi", 16),
      ("heartRate", 8),
      ("smokingStatus", 10),
      ("diabetesStatus", 6),
    ];
  };

  // Medical Files Management
  let medicalFiles = Map.empty<Principal, Map.Map<Text, Storage.ExternalBlob>>();
  let medicalFileMetadata = Map.empty<Principal, Map.Map<Text, MedicalFileMetadata>>();

  public shared ({ caller }) func uploadMedicalFile(
    id : Text,
    file : Storage.ExternalBlob,
    filename : Text,
    size : Nat,
    contentType : ?Text,
  ) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can upload files");
    };

    // Store file reference
    switch (medicalFiles.get(caller)) {
      case (null) {
        let userFiles = Map.empty<Text, Storage.ExternalBlob>();
        userFiles.add(id, file);
        medicalFiles.add(caller, userFiles);
      };
      case (?userFiles) {
        userFiles.add(id, file);
      };
    };

    // Store metadata
    let metadata : MedicalFileMetadata = {
      id;
      filename;
      size;
      uploadedAt = Time.now();
      contentType;
    };

    switch (medicalFileMetadata.get(caller)) {
      case (null) {
        let userMetadata = Map.empty<Text, MedicalFileMetadata>();
        userMetadata.add(id, metadata);
        medicalFileMetadata.add(caller, userMetadata);
      };
      case (?userMetadata) {
        userMetadata.add(id, metadata);
      };
    };

    id;
  };

  public query ({ caller }) func listMedicalFiles() : async [(Text, Storage.ExternalBlob)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can list files");
    };

    switch (medicalFiles.get(caller)) {
      case (null) { [] };
      case (?userFiles) {
        userFiles.toArray();
      };
    };
  };

  public query ({ caller }) func getMedicalFile(id : Text) : async ?Storage.ExternalBlob {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can download files");
    };

    switch (medicalFiles.get(caller)) {
      case (null) { null };
      case (?userFiles) {
        userFiles.get(id);
      };
    };
  };

  public shared ({ caller }) func deleteMedicalFile(id : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete files");
    };

    // Delete file
    switch (medicalFiles.get(caller)) {
      case (null) {};
      case (?userFiles) {
        userFiles.remove(id);
      };
    };

    // Delete metadata
    switch (medicalFileMetadata.get(caller)) {
      case (null) {};
      case (?userMetadata) {
        userMetadata.remove(id);
      };
    };

    true;
  };

  public query ({ caller }) func listMedicalFilesMetadata() : async [MedicalFileMetadata] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can list file metadata");
    };

    switch (medicalFileMetadata.get(caller)) {
      case (null) { [] };
      case (?userMetadata) {
        userMetadata.values().toArray();
      };
    };
  };

  public query ({ caller }) func getMedicalFileMetadata(id : Text) : async ?MedicalFileMetadata {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get file metadata");
    };

    switch (medicalFileMetadata.get(caller)) {
      case (null) { null };
      case (?userMetadata) {
        userMetadata.get(id);
      };
    };
  };

  public query ({ caller }) func getLocation() : async ?Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view location");
    };

    switch (userProfiles.get(caller)) {
      case (null) { null };
      case (?profile) {
        profile.location;
      };
    };
  };

  public shared ({ caller }) func updateLocation(location : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update location");
    };

    switch (userProfiles.get(caller)) {
      case (null) {
        Runtime.trap("User profile not found");
      };
      case (?profile) {
        let updatedProfile = { profile with location = ?location };
        userProfiles.add(caller, updatedProfile);
      };
    };
  };

  public query ({ caller }) func getMedicalReportsSummary() : async [(Text, MedicalFileMetadata)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access medical reports");
    };

    switch (medicalFileMetadata.get(caller)) {
      case (null) { [] };
      case (?userMetadata) {
        userMetadata.toArray();
      };
    };
  };

  public query ({ caller }) func getMedicalReportMetadata(id : Text) : async ?MedicalFileMetadata {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access medical reports");
    };

    switch (medicalFileMetadata.get(caller)) {
      case (null) { null };
      case (?userMetadata) {
        userMetadata.get(id);
      };
    };
  };
};

