/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext } from "react";
import { AppDispatchContext } from "../redux/AppStateProvider";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Shortcuts from "./Shortcuts";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MainMenu() {
  const dispatch = useContext(AppDispatchContext);

  return (
    <Menu as="div" className="relative inline-block text-right">
      <Shortcuts />
      <div>
        <Menu.Button className="inline-flex justify-center rounded-none border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100  dark:bg-black dark:text-gray-50">
          menu
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-6" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/#"
                  onClick={() =>
                    dispatch({
                      type: "SHOW_SHORTCUTS",
                      payload: true,
                    })
                  }
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Shortcuts
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={() => {
                    dispatch({
                      type: "SAVE_PICTURE",
                      payload: true,
                    });
                    setTimeout(
                      () => dispatch({ type: "SAVE_PICTURE", payload: false }),
                      400
                    );
                  }}
                  href="/#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Save
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
