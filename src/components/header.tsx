import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { FaUser, FaZ } from "react-icons/fa6";
import Link from "next/link";
import { HiOutlineMenu } from "react-icons/hi";
import { RiChatSmile2Fill, RiMenu3Fill } from "react-icons/ri";
import { IoIosArrowDown, IoMdLogOut, IoMdSettings } from "react-icons/io";
import { GiNightSleep } from "react-icons/gi";
import { MdAccountCircle } from "react-icons/md";
import { FaStar } from "react-icons/fa";

export default function Header({ user, logout }: { user: any, logout:any }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Discover", href: "/discover" },
    { name: "Gallery", href: "/gallery" },
    { name: "Top Rated", href: "/top" },
  ];
  const callsToAction = [
    { name: "Account", href: "/account", icon: FaUser  },
    { name: "Chat", href: "/chat", icon: RiChatSmile2Fill  },
    { name: "Dreams", href: "/dreams", icon: GiNightSleep },
    { name: "Favorites", href: "/favorites", icon: FaStar },
  ];
  const profileButton = (
    <>
      <Popover className="relative top-0 z-20">
        <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
          <span>{user?.name + " " + user?.lastName}</span>
          <img
            className="h-8 w-auto rounded-full"
            src="https://cutecatshq.com/wp-content/uploads/2014/08/That-Was-Good-Yum.jpg"
            alt=""
          />
          <IoIosArrowDown className="h-5 w-5" aria-hidden="true" />
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute z-10 mt-5 flex w-screen max-w-sm lg:-translate-x-2/3 -translate-x-6 px-4">
            <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
              <div className="p-4">
                {callsToAction.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon
                        className="h-6 w-6 text-gray-600 group-hover:text-teal-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <a
                        href={item.href}
                        className="font-semibold text-gray-900"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                <button
                  onClick={logout}
                  className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-red-900 hover:bg-gray-100"
                >
                  <IoMdLogOut
                    className="h-5 w-5 flex-none text-red-400"
                    aria-hidden="true"
                  />
                  Log out
                </button>
                <Link
                  href="/settings"
                  onClick={logout}
                  className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-teal-900 hover:bg-gray-100"
                >
                  <IoMdSettings
                    className="h-5 w-5 flex-none text-teal-400"
                    aria-hidden="true"
                  />
                  Settings
                </Link>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
  return user.name && (
    <>
      <div className="bg-white fixed top-0 w-screen z-20">
        <header className="inset-x-0 top-0 z-50">
          <nav
            className="flex items-center justify-between p-6 lg:px-8"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <Link
                href="/"
                className="-m-1.5 p-1.5 px-2 flex gap-1 items-center justify-center text-black text-xl hover:text-gray-500 duration-200"
              >
                <span className="sr-only">Dreamer</span>
                <GiNightSleep className="text-2xl" /> Dreamer
              </Link>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <HiOutlineMenu />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              {profileButton}
            </div>
          </nav>
          <Dialog
            as="div"
            className="lg:hidden"
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
          >
            <div className="fixed inset-0 z-50" />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <RiMenu3Fill />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y gap-3 divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="space-y-2 py-6">{profileButton}</div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </header>
      </div>
    </>
  );
}
