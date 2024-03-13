import { useRef, useState, useEffect } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { FaRegCommentDots, FaTimes, FaPaperPlane } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import endPoint from "@services/api";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { Popover, Transition } from "@headlessui/react";

export default function Comment({ dream, auth }: { dream: any; auth: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dreamId, setDreamId] = useState<string>("");
  const [socket, setSocket] = useState<any>(null);
  const textRef = useRef<any>();
  const editRef = useRef<any>();
  const [comments, setComments] = useState<any[]>([]);
  const [connected, setConnected] = useState(false);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  useEffect(() => {
    async function getComments() {
      const { data } = await axios.get(endPoint.dreams.getOne(dream.id));
      setComments(data?.comments);
      setInitialLoad(false);
    }

    getComments();
  }, []);

  async function connect(dreamId: string) {
    setIsModalOpen(true);
    setDreamId(dreamId);

    const { data } = await axios.get(endPoint.dreams.getOne(dreamId));
    setComments(data?.comments);
    setInitialLoad(false);

    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    const newSocket = new SockJS("http://localhost:3030/api/v1/dream", {
      transports: ["xhr-streaming"],
      headers,
    });
    const ws = Stomp.over(newSocket);
    setSocket(ws);
    ws.connect(
      headers,
      (frame: any) => {
        setConnected(true);
        const sendSub = ws.subscribe(
          `/topic/dream/${dreamId}/comment`,
          (comment: any) => {
            setComments((old) => [...old, JSON.parse(comment.body)]);
          }
        );
        const deleteSub = ws.subscribe(
          `/topic/comment/${dreamId}/delete`,
          (comment: any) => {
            const body = JSON.parse(comment.body);
            setComments((prevComments) =>
              prevComments.filter((element) => element.id !== body.id)
            );
          }
        );
        const editSub = ws.subscribe(
          `/topic/comment/${dreamId}/edit`,
          (editedComment: any) => {
            const editedData = JSON.parse(editedComment.body);

            setComments((prevComments) =>
              prevComments.map((comment) =>
                comment.id === editedData.id ? editedData : comment
              )
            );
          }
        );
        setSubscriptions([sendSub, deleteSub, editSub]);
      },
      headers
    );
  }

  function sendComment(e: any) {
    e.preventDefault();
    const comment = textRef.current?.value;
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    socket.send(
      `/app/dream/${dreamId}/comment`,
      headers,
      JSON.stringify({ dream: dreamId, comment })
    );
    textRef.current.value = "";
  }

  function deleteComment(commentId: string) {
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    socket.send(
      `/app/dream/${dreamId}/delete`,
      headers,
      JSON.stringify({ id: commentId })
    );
  }
  function editComment(commentId: string) {
    const updatedComment = editRef.current.value;
    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };
    socket.send(
      `/app/dream/${dreamId}/edit`,
      headers,
      JSON.stringify({ id: commentId, comment: updatedComment })
    );
    setEditingCommentId(null);
  }

  function openEdit(commentId: string) {
    setEditingCommentId(commentId);
  }

  function cancelEdit() {
    setEditingCommentId(null);
  }

  function disconnect() {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      setConnected(false);
    }
  }

  function closeModal() {
    setIsModalOpen(false);
    cancelEdit();
    disconnect();
  }

  return (
    <>
      <div className="flex gap-1 justify-center items-center">
        <FaRegCommentDots
          onClick={() => connect(dream.id)}
          className="text-lg cursor-pointer"
        />
        <span className="ml-1 text-sm text-gray-600">{comments.length}</span>
      </div>

      {isModalOpen && (
        <div className="z-50 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="flex flex-col bg-white rounded-lg w-full max-w-md h-4/6">
            <div className="p-4 flex justify-between items-center border-b border-gray-200">
              <h2 className="text-lg font-semibold">Comments</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-red-500 focus:outline-none"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>
            <div className="overflow-y-auto flex-grow">
              {comments.length > 0 &&
                comments.map((commentItem: any) => (
                  <div key={commentItem.id} className="relative flex p-4">
                    <img
                      src="https://i.pinimg.com/736x/31/ec/2c/31ec2ce212492e600b8de27f38846ed7.jpg"
                      alt="Avatar"
                      className="w-10 h-10 rounded-full mr-4"
                    />

                    <div
                      className={`flex flex-col flex-grow w-full rounded-lg p-4 relative ${
                        commentItem?.createdBy === auth.user.username
                          ? "bg-green-100"
                          : "bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-sm">
                          {commentItem?.createdBy}
                        </p>
                        <div className="flex items-center">
                          <p className="text-gray-500 text-xs mr-2">
                            {formatDistanceToNow(
                              new Date(commentItem.updatedAt),
                              { addSuffix: true }
                            )}
                          </p>
                          <div className="flex">
                            {commentItem.createdBy === auth.user.username && (
                              <Popover className="relative">
                                {({ open, close }) => (
                                  <>
                                    <Popover.Button
                                      className={`${
                                        open ? "" : "text-opacity-80"
                                      } text-gray-400 hover:text-gray-500 focus:outline-none`}
                                    >
                                      <AiOutlineEllipsis className="text-lg" />
                                    </Popover.Button>

                                    <Transition
                                      show={open}
                                      enter="transition duration-100 ease-out"
                                      enterFrom="transform scale-95 opacity-0"
                                      enterTo="transform scale-100 opacity-100"
                                      leave="transition duration-75 ease-out"
                                      leaveFrom="transform scale-100 opacity-100"
                                      leaveTo="transform scale-95 opacity-0"
                                    >
                                      <Popover.Panel
                                        static
                                        className="absolute z-50 right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                      >
                                        <div className="py-1">
                                          <button
                                            onClick={() => {
                                              openEdit(commentItem.id);
                                              close();
                                            }}
                                            className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                          >
                                            Edit
                                          </button>
                                          <button
                                            onClick={() =>
                                              deleteComment(commentItem.id)
                                            }
                                            className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      </Popover.Panel>
                                    </Transition>
                                  </>
                                )}
                              </Popover>
                            )}
                          </div>
                        </div>
                      </div>

                      {editingCommentId === commentItem.id ? (
                        <div>
                          <textarea
                            ref={editRef}
                            defaultValue={commentItem.comment}
                            className="w-full h-20 mb-2 rounded-lg p-2 border border-gray-200 focus:ring-teal-500 focus:border-teal-500"
                          ></textarea>
                          <div className="flex justify-end">
                            <button
                              onClick={() => cancelEdit()}
                              className="px-2 py-2 mr-2 text-base bg-gray-400 text-white rounded-lg"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => editComment(commentItem.id)}
                              className="px-2 py-2 text-base bg-teal-500 text-white rounded-lg"
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm whitespace-pre-line break-words">
                          {commentItem?.comment}
                        </p>
                      )}
                    </div>
                  </div>
                ))}

              {!initialLoad && comments.length === 0 && (
                <div className="flex justify-center items-center p-4 text-gray-500">
                  <p className="text-center">
                    This dream still has no comments! Be the first to comment.
                  </p>
                </div>
              )}
            </div>

            <div className="relative p-4 border-t border-gray-200  bottom-0 rounded-bl-lg rounded-br-lg">
              <div className="flex items-center justify-between">
                <img
                  src="https://i.pinimg.com/736x/31/ec/2c/31ec2ce212492e600b8de27f38846ed7.jpg"
                  alt="Avatar"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <form
                  onSubmit={sendComment}
                  className="flex items-center flex-grow"
                >
                  <input
                    ref={textRef}
                    type="text"
                    className="w-full h-12 rounded-lg pl-4 pr-12 border-gray-200 focus:ring-teal-500 focus:border-teal-500 bg-gray-100"
                  />
                </form>

                <button
                  type="submit"
                  className="p-2 flex items-center justify-center rounded-full bg-teal-500 ml-2 h-12 w-12"
                  onClick={sendComment}
                >
                  <FaPaperPlane className="text-lg  text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
