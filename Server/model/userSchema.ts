import { Schema, model } from "mongoose";
const userschema = new Schema({
  username: {
    type: "string",
    required: true,
    min: 3,
  },
  email: {
    type: "string",
    required: true,
    lowercase: true,
    unique: true,
  },
  phone: {
    type: "string",
    required: true,

  },
  profileImage:{
    type: String
  },
  images:{
    type: Array
  },
  profileId:{
    type:Number,
    required: true,
    unique: true,
    maxLength: 5,
  },
  dob: {
    type: "string",
    required: true,

  },
  password: {
    type: "string",
    min: 5,
    required: true,

  },
  gender: {
    type: "string",
    required: true,

  },
  blocked: {
    type: "boolean",
    default: false,
  },
  height: {
    type: Number,
  },
  age:{
    type:Number
  },
  spokenLanguages: {
    type: [String],
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  diet: {
    type: String,
  },
  smoke: {
    type: String,
  },
  drink: {
    type: String,
  },
  Bodytype: {
    type: String,
  },
  bio: {
    type: String,
  },
  bloodgroup: {
    type: String,
  },
  MotherTongue: {
    type: String,
  },
  MaritalStatus: {
    type: String,
  },
  weight: {
    type: String,
  },
  Complexion: {
    type: String,
  },
  PhysicalStatus: {
    type: String,
  },
  Caste: {
    type: String,
  },
  religion: {
    type: String,
  },
  Education: {
    type: String,
  },
  eduDetails: {
    type: String,
  },
  school:{
    type: String,
  },
  schoolPlace:{
    type: String,
  },
  Schoolyear:{
    type:String
  },
  clgName:{
    type: String,
  },
  clgPlace:{
    type: String,
  },
  clgyear:{
    type:String
  },
  Job:{
    type: String,
  },
  CompanyName:{
    type: String,
  },
  jobLocation:{
    type: String,
  },
  ageFrom:{
    type: Number,
    default:21
  },
  ageTo:{
    type: Number,
  },
  heightFrom:{
    type:Number,
  },
  heightTo:{
    type:Number,
  },
  prefReligion:{
    type:String
  },
  prefCaste:{
    type:[String]
  },
  prefDiet:{
    type:String
  },
  prefSmoke:{
    type:String
  },
  prefDrink:{
    type:String
  },
  followers:{
    type:Array,
    default:[]
  },
  following:{
    type:Array,
    default:[]
  },
  blockedUsers:{
    type:Array,
    default:[]
  },
  blockingUsers:{
    type:Array,
    default:[]
  },
});

const User = model("users", userschema, "users");
export default User;
