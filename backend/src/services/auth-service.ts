import { IUser, User } from "../models/User"
import { ApiError } from "../utils/api-error"
import { generateAccessToken, generateRefreshToken } from "../utils/jwt"

export interface RegisterInput{
  name: string,
  email: string,
  password: string
}

export interface AuthResult{
  user: {
    id: string,
    name: string,
    email: string
  },
  accessToken: string,
  refreshToken: string
}

export async function registerUser(input: RegisterInput): Promise<AuthResult>{
  const existingUser = await User.findOne({email: input.email.toLocaleLowerCase()})

  if(existingUser){
    throw new ApiError(409, "User already exists")
  }

  const user = await User.create({
    name: input.name,
    email: input.email,
    password: input.password
  })

  return buildAuthResult(user)
}

export async function loginUser(email: string, password: string): Promise<AuthResult>{
  const user = await User.findOne({email: email.toLocaleLowerCase()}).select("+password")

  if(!user){
    throw new ApiError(401, "Invalid email or password")
  }

  const isPasswordCorrect = await user.comparePassword(password)

  if(!isPasswordCorrect){
    throw new ApiError(401, "Invalid email or password")
  }

  return buildAuthResult(user)
}

function buildAuthResult(user: IUser & {_id: any}): AuthResult{
  const userId = user._id.toString()

  const accessToken = generateAccessToken({userId})
  const refreshToken = generateRefreshToken({userId})

  return {
    user: {
      id: userId,
      name: user.name,
      email: user.email
    },
    accessToken,
    refreshToken
  }
}