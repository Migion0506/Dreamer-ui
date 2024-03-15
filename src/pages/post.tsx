import Header from "@components/header";
import { useAuth } from "@hooks/useAuth";
import endPoint from "@services/api";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

export default function Post() {
  const auth: any = useAuth();
  const router = useRouter();

  const [topics, setTopics] = useState<any[]>([]);

  const titleRef = useRef<HTMLInputElement>(null)
  const aboutRef = useRef<HTMLTextAreaElement>(null)
  const topicsRef = useRef<HTMLInputElement>(null)
  const privateRef = useRef<HTMLInputElement>(null)
  const publicRef = useRef<HTMLInputElement>(null)

  const handleTopics = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value.includes(',')){
      const t = e.target.value.split(',')[0]
      setTopics([...topics, t])
      e.target.value = '' 
    }
  }

  const removeTopic = (id:string) => {
    setTopics(topics.filter(topic => topic !== id))
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = titleRef?.current?.value
    const content = aboutRef?.current?.value
    const publicDream = publicRef?.current?.checked

    try {
      const {data} = await axios.post(endPoint.dreams.create, {
        title,
        content,
        public: publicDream,
        pictureUrl: 'https://i.ytimg.com/vi/GKvV8vx3_QE/maxresdefault.jpg'
      })

      const sendTopics = topics?.map(topic => ({topic, dreamId: data.id}))
      await axios.post(endPoint.topics.createMany, sendTopics)

      auth.setAlert({
        active: true,
        message: "Dream created successfully",
        type: "success",
        autoClose: true,
    })
    setTimeout(() => {
      router.push('/account')
    }, 1000)
    } catch (error:any) {
      auth.setAlert({
        active: true,
        message: 'Error creating dream: '+error.message,
        type: 'error',
        autoClose: true,
      })
    }

  }
  return (
    <>
      <Header user={auth.user} logout={auth.logout} />
      <form onSubmit={submitHandler} className="flex flex-col gap-5 justify-center items-center p-2">
        <div className="py-8 flex flex-col gap-5 justify-center items-center">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-3xl font-semibold font-dancing leading-7 text-gray-900">
              Save your dream
            </h2>
            <p className="mt-1 text-lg font-dancing leading-6 text-gray-600">
              This information will be saved encrypted and only visible to you
              and the people you share it with.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                      dreammer.com/
                    </span>
                    <input
                      ref={titleRef}
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="My best dream ever"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    ref={aboutRef}
                    id="about"
                    name="about"
                    rows={6}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write the story of your dream.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <MdOutlineAddPhotoAlternate
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="topics"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Topics
                </label>
                <div className="mt-2 flex border-b-2 p-2 gap-2 max-w-lg min-w-full overflow-auto">
                  <div className="flex gap-2">
                    {topics.map((topic, key) => (
                      <div onClick={() => removeTopic(topic)} key={key} className="bg-teal-500 text-white p-1 px-2 rounded-lg hover:bg-red-500 duration-300">
                        {topic}
                      </div>
                    ))}
                  </div>
                  <input
                    onChange={handleTopics}
                    required
                    ref={topicsRef}
                    type="text"
                    placeholder="Add topics"
                    onKeyDown={(e:any) => {
                      if(e.key !== 'Enter') return
                      const value = topicsRef.current?.value
                      setTopics([...topics, value]); 
                      e.target.value = ''
                    }}
                    name="topics"
                    id="topics"
                    autoComplete="topics"
                    className="block min-w-32 !outline-0 rounded-md border-none !outline-none py-1.5 text-gray-900 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  {"Dream's Privacy"}
                </legend>
                {/* <p className="mt-1 text-sm leading-6 text-gray-600">
                  These are delivered via SMS to your mobile phone.
                </p> */}
                <div className="mt-3 space-y-3">
                  <div className="flex items-center gap-x-3">
                    <input
                    ref={publicRef}
                      id="public"
                      name="privacy"
                      type="radio"
                      checked
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="public"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Public
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      ref={privateRef}
                      id="private"
                      name="privacy"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="private"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Private
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <div className="flex items-center justify-center gap-6">
          <Link
            href={"/account"}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </Link>
          <button
          onClick={(e:any) => submitHandler(e)}
            type="button"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
        </div>
      </form>
    </>
  );
}
