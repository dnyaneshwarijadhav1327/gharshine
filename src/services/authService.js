/**
 * Auth Service (Frontend Mock Layer)
 * 
 * TODO: Connect to backend Auth APIs (POST /api/auth/login, POST /api/auth/signup, etc.)
 */

export const authService = {
  async login(email, password) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      success: true,
      message: "Authentication placeholder: Ready for backend API integration.",
      user: {
        id: "usr_mock_1",
        name: "Homeowner User",
        email: email
      }
    };
  },

  async signup(userData) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      success: true,
      message: "Signup placeholder: Ready for backend user registration API.",
      user: {
        id: "usr_mock_new",
        name: userData.name,
        email: userData.email,
        phone: userData.phone
      }
    };
  },

  async forgotPassword(email) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return {
      success: true,
      message: `Password reset link sent to ${email} (Frontend Mock).`
    };
  }
};
