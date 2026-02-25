export interface UserInterface {
  id: string
  user_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string
  avatar_url: string

  socials: string[]

  is_blocked: boolean
  is_admin: boolean
  created_at: string
}
