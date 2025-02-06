export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: 'admin' | 'faculty' | 'student'
          full_name: string
          department: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role: 'admin' | 'faculty' | 'student'
          full_name: string
          department?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: 'admin' | 'faculty' | 'student'
          full_name?: string
          department?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          code: string
          name: string
          department: string
          credits: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          code: string
          name: string
          department: string
          credits: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          code?: string
          name?: string
          department?: string
          credits?: number
          created_at?: string
          updated_at?: string
        }
      }
      course_assignments: {
        Row: {
          id: string
          course_id: string
          faculty_id: string
          created_at: string
        }
        Insert: {
          id?: string
          course_id: string
          faculty_id: string
          created_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          faculty_id?: string
          created_at?: string
        }
      }
      time_slots: {
        Row: {
          id: string
          day_of_week: number
          start_time: string
          end_time: string
          created_at: string
        }
        Insert: {
          id?: string
          day_of_week: number
          start_time: string
          end_time: string
          created_at?: string
        }
        Update: {
          id?: string
          day_of_week?: number
          start_time?: string
          end_time?: string
          created_at?: string
        }
      }
      rooms: {
        Row: {
          id: string
          name: string
          capacity: number
          type: 'classroom' | 'lab'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          capacity: number
          type: 'classroom' | 'lab'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          capacity?: number
          type?: 'classroom' | 'lab'
          created_at?: string
        }
      }
      schedules: {
        Row: {
          id: string
          course_assignment_id: string
          time_slot_id: string
          room_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_assignment_id: string
          time_slot_id: string
          room_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_assignment_id?: string
          time_slot_id?: string
          room_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}