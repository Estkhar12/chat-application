import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [userInput, setUserInput] = useState({});

  const handleInput = (e) => {
    setUserInput({ ...userInput, [e.target.id]: e.target.value });
  };
  console.log(userInput);

  const handleSubmit = async(e) => {
    e.prevenDefault();
    try {
      const login = await axios.post("/api/user/login", userInput);
      const data = login.data;
      if (data.success === false) {
        console.log(data.message);
      }
      toast.success("User LogedIn");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <section className="h-full bg-neutral-200 dark:bg-neutral-700">
        <div className="container h-full p-10">
          <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex-wrap">
                {/* <!-- Left column container--> */}
                <div className="px-4 md:px-0 w-96">
                  <div className="md:mx-6 md:p-12">
                    {/* <!--Logo--> */}
                    <div className="text-center">
                      <img
                        className="mx-auto w-20"
                        src="https://media.licdn.com/dms/image/C510BAQGbJciAIl3Mhg/company-logo_200_200/0/1631431439358/solulab_logo?e=2147483647&v=beta&t=MFhun_JMaj66t-PQ_F1tMCaGa2DHRqvp3Tm3_rel4D8"
                        alt="logo"
                      />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                        We are The SoluLab Team
                      </h4>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <p className="mb-4">Please login to your account</p>
                      {/* <!--Username input--> */}
                      <TEInput
                        onChange={handleInput}
                        id="email"
                        type="text"
                        placeholder="Email Address"
                        className="mb-4 outline outline-1 outline-offset-2"
                      ></TEInput>

                      {/* <!--Password input--> */}
                      <TEInput
                        onChange={handleInput}
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="mb-4 outline outline-1 outline-offset-2"
                      ></TEInput>

                      {/* <!--Submit button--> */}
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <TERipple rippleColor="light" className="w-full">
                          <button
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="button"
                            style={{
                              background:
                                "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                            }}
                          >
                            Log in
                          </button>
                          <ToastContainer />
                        </TERipple>

                        {/* <!--Forgot password link--> */}
                        <a href="#!">Forgot password?</a>
                      </div>

                      {/* <!--Register button--> */}
                      <div className="flex items-center justify-between pb-6">
                        <p className="flex mb-0 mr-2 ">
                          Dont have an account?
                          <Link to="/">
                            <TERipple rippleColor="light">
                              <button
                                type="button"
                                className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                              >
                                Register
                              </button>
                            </TERipple>
                          </Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
