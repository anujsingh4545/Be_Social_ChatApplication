import React from 'react'
import { signIn } from 'next-auth/react'
import Header from './Header'

function signin({ providers }) {
  return (
    <div className=" h-[110vh] w-[100%] bg-black sm:h-[100vh] ">
      <Header run="false" />
      <div className=" m-auto mt-40 w-[100%] max-w-7xl  text-center">
        <img
          src="/white-besocial.jpg"
          className="m-auto mt-20 w-[70%]"
          alt=""
        />
        <p className="font-md my-10 text-[1.5rem] font-semibold italic text-white">
          To get access to site .., Please sign in first 💙
        </p>
        <section className="mt-32">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="w-[50%] cursor-pointer rounded-xl bg-blue-600 px-5 py-3  text-[1.5rem] text-white md:w-[30%]"
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

export default signin
