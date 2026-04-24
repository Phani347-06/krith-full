import React from 'react';

const SignUp = ({ onBack, onLogin, onSignUp }) => {
  return (
    <div className="bg-warm-cream min-h-screen flex flex-col justify-center items-center p-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-lemon-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 z-0 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-slushie-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 z-0 pointer-events-none"></div>
      
      <main className="w-full max-w-md z-10">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 
            onClick={onBack}
            className="font-display-secondary text-display-secondary text-clay-black tracking-tighter cursor-pointer"
          >
            Campus Cortex
          </h1>
          <p className="font-body-large text-body-large text-warm-charcoal mt-2 text-center">Crafted for learners.</p>
        </div>
        
        {/* Main Card */}
        <div className="bg-pure-white border border-oat-border rounded-[24px] p-10 clay-shadow">
          <h2 className="font-card-heading text-card-heading text-clay-black mb-10">Create Account</h2>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Username */}
            <div>
              <label className="block font-label-uppercase text-label-uppercase text-warm-charcoal mb-4 uppercase tracking-wider text-left" htmlFor="username">Username</label>
              <input 
                className="w-full bg-pure-white border border-outline rounded px-6 py-3 font-body-standard text-body-standard text-clay-black focus:border-focus-ring focus:ring-1 focus:ring-focus-ring transition-colors" 
                id="username" 
                placeholder="janesmith123" 
                type="text"
              />
            </div>
            {/* Password --> */}
            <div>
              <label className="block font-label-uppercase text-label-uppercase text-warm-charcoal mb-4 uppercase tracking-wider text-left" htmlFor="password">Password</label>
              <input 
                className="w-full bg-pure-white border border-outline rounded px-6 py-3 font-body-standard text-body-standard text-clay-black focus:border-focus-ring focus:ring-1 focus:ring-focus-ring transition-colors" 
                id="password" 
                placeholder="••••••••" 
                type="password"
              />
            </div>
            {/* Role --> */}
            <div>
              <label className="block font-label-uppercase text-label-uppercase text-warm-charcoal mb-4 uppercase tracking-wider text-left" htmlFor="role">Role</label>
              <select className="w-full bg-pure-white border border-outline rounded px-6 py-3 font-body-standard text-body-standard text-clay-black focus:border-focus-ring focus:ring-1 focus:ring-focus-ring transition-colors" id="role">
                <option value="student">Student</option>
                <option value="parent">Parent</option>
              </select>
            </div>
            {/* School ID --> */}
            <div>
              <label className="block font-label-uppercase text-label-uppercase text-warm-charcoal mb-4 uppercase tracking-wider text-left" htmlFor="schoolId">School ID</label>
              <input 
                className="w-full bg-pure-white border border-outline rounded px-6 py-3 font-body-standard text-body-standard text-clay-black focus:border-focus-ring focus:ring-1 focus:ring-focus-ring transition-colors" 
                id="schoolId" 
                placeholder="Enter your School ID" 
                type="number"
              />
            </div>
            {/* Create Account Button --> */}
            <div className="pt-2">
              <button 
                onClick={onSignUp}
                className="w-full bg-clay-black text-pure-white font-button text-button rounded-[12px] py-4 btn-interaction hover:bg-dragonfruit-magenta flex justify-center items-center gap-2" 
                type="submit"
              >
                <span>Create Account</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          </form>
          
          {/* Divider --> */}
          <div className="flex items-center my-10">
            <div className="flex-grow border-t border-dashed border-oat-border"></div>
            <span className="px-4 font-label-uppercase text-label-uppercase text-warm-charcoal uppercase tracking-wider text-center">Or continue with</span>
            <div className="flex-grow border-t border-dashed border-oat-border"></div>
          </div>
          
          {/* Social Sign-up --> */}
          <div className="grid grid-cols-2 gap-6">
            <button className="flex items-center justify-center gap-4 border border-outline rounded py-3 bg-pure-white hover:bg-surface-container-low transition-colors clay-shadow">
              <svg className="w-5 h-5" fill="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg>
              <span className="font-button text-button text-clay-black">Google</span>
            </button>
            <button className="flex items-center justify-center gap-4 border border-outline rounded py-3 bg-pure-white hover:bg-surface-container-low transition-colors clay-shadow">
              <svg className="w-5 h-5 text-[#5865F2]" fill="currentColor" viewbox="0 0 127.14 96.36" xmlns="http://www.w3.org/2000/svg"><path d="M107.7 8.07A105.15 105.15 0 0081.47 0a72.06 72.06 0 00-3.36 6.83 97.68 97.68 0 00-29.08 0A72.37 72.37 0 0045.67 0a105.46 105.46 0 00-26.23 8.07C2.04 33.84-2.4 58.74.9 83.46a105.73 105.73 0 0032.27 16.17 77.7 77.7 0 006.89-11.1 66.25 66.25 0 01-10.87-5.18c.9-.66 1.8-1.36 2.66-2.06a75.64 75.64 0 0064.32 0c.87.7 1.76 1.4 2.66 2.06a66.45 66.45 0 01-10.87 5.18 77.7 77.7 0 006.89 11.1 105.25 105.25 0 0032.27-16.17c3.55-27.11-2.43-50.5-18.42-75.39zm-65.04 60.1c-6.14 0-11.23-5.6-11.23-12.43s4.97-12.43 11.23-12.43c6.33 0 11.33 5.66 11.23 12.43 0 6.83-4.96 12.43-11.23 12.43zm41.83 0c-6.14 0-11.23-5.6-11.23-12.43s4.97-12.43 11.23-12.43c6.33 0 11.33 5.66 11.23 12.43 0 6.83-4.9-12.43-11.23-12.43z"></path></svg>
              <span className="font-button text-button text-clay-black">Discord</span>
            </button>
          </div>
          
          {/* Login Link --> */}
          <div className="text-center mt-10">
            <p className="font-body-standard text-body-standard text-warm-charcoal">
              Already have an account? 
              <button 
                onClick={onLogin}
                className="font-button text-button text-clay-black underline hover:text-dragonfruit-magenta transition-colors ml-2"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
