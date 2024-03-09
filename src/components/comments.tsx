import React, { useState, useEffect } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { FaRegCommentDots, FaTimes } from "react-icons/fa";
import axios from "axios";
import endPoint from "@services/api";
import formatDate from '../utils/formatDate';

export default function Comment({ dream, auth }: { dream: any, auth: any }) {
    const [comment, setComment] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);
    const [dreams, setDreams] = useState([]);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedComment, setEditedComment] = useState("");

    const toggleMenu = (commentId: any) => {
        if (selectedComment === commentId) {
            setSelectedComment(null);
        } else {
            setSelectedComment(commentId);
        }
    };

    useEffect(() => {
        loadDreams();

    }, []);

    const loadDreams = async () => {
        try {
            const response = await axios.get(endPoint.dreams.get);
            setDreams(response.data);
        } catch (error) {
            console.error("Error loading dreams:", error);
        }
    };

    const createComment = async () => {
        try {
            await axios.post(endPoint.comments.create, {
                dream: dream.id,
                comment: comment,
            });
            await loadDreams();
            setComment("");
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    const deleteComment = async (id: string) => {
        try {
            await axios.delete(endPoint.comments.delete(id));
            await loadDreams();
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const editComment = async (id: string) => {
        try {
            await axios.put(endPoint.comments.edit(id), { comment: editedComment });
            setEditingCommentId(null);
            setEditedComment("");
            await loadDreams();
            setSelectedComment(null);
        } catch (error) {
            console.error("Error editing comment:", error);
        }
    };

    const cancelEdit = () => {
        setEditingCommentId(null);
        setEditedComment("");
    };

    const handleEditClick = (commentId: any) => {
        setEditingCommentId(commentId);
        setSelectedComment(null);
    };

    return (
        <>
            <div className="flex gap-1 justify-center items-center">
                {dreams.map((dreamItem: any) => (
                    <div key={dreamItem.id} className="flex items-center">
                        {dream.id === dreamItem.id && (
                            <>
                                <FaRegCommentDots onClick={() => setIsModalOpen(true)} className="text-lg cursor-pointer" />
                                <span className="ml-1 text-sm text-gray-600">
                                    {dreamItem.comments?.length || 0}
                                </span>
                            </>
                        )}
                    </div>
                ))}
            </div>


            {isModalOpen && (
                <div className="z-50 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="flex flex-col bg-white rounded-lg w-full max-w-md h-4/6">

                        <div className="p-4 flex justify-between items-center border-b border-gray-200">
                            <h2 className="text-lg font-semibold">Comments</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-red-500 focus:outline-none">
                                <FaTimes className="text-lg" />
                            </button>
                        </div>
                        <div className="overflow-y-auto flex-grow">
                            {dreams.map((dreamItem: any) => (
                                <div key={dreamItem.id}>
                                    {dream.id === dreamItem.id && (
                                        dreamItem.comments.length > 0 ? (
                                            dreamItem.comments.map((commentItem: any) => (
                                                <div key={commentItem.id} className="relative flex p-4 ">
                                                    <img src="https://i.pinimg.com/736x/31/ec/2c/31ec2ce212492e600b8de27f38846ed7.jpg" alt="Avatar" className="w-10 h-10 rounded-full mr-4" />

                                                    <div className={`flex flex-col flex-grow w-full rounded-lg p-4 relative ${commentItem.createdBy === auth.user.username ? 'bg-teal-100' : 'bg-gray-100'}`}>
                                                        <div className="flex items-center justify-between mb-2">
                                                            <p className="font-semibold text-sm">{commentItem.createdBy}</p>
                                                            <p className="text-gray-500 text-xs mr-4">{formatDate(commentItem.updatedAt)}</p>

                                                        </div>

                                                        {editingCommentId === commentItem.id ? (
                                                            <div className="flex flex-col items-start">
                                                                <input
                                                                    type="text"
                                                                    value={editedComment !== "" ? editedComment : commentItem.comment}
                                                                    onChange={(e) => setEditedComment(e.target.value)}
                                                                    className="flex-grow border border-gray-400 rounded-lg px-4 py-2 mr-2 focus:outline-none focus:border-teal-200"
                                                                />
                                                                <div className="mt-2">
                                                                    <button onClick={() => editComment(commentItem.id)} className="bg-teal-500 text-white rounded-lg px-3 py-1 mr-2 text-base hover:bg-teal-600 focus:outline-none">
                                                                        Update
                                                                    </button>
                                                                    <button onClick={cancelEdit} className="bg-gray-100 text-gray-700 rounded-lg px-4 py-1 text-base hover:bg-gray-200 focus:outline-none">
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <p className="text-sm whitespace-pre-line break-words">{commentItem.comment}</p>
                                                        )}

                                                        {commentItem.createdBy === auth.user.username && (
                                                            <div className="absolute top-0 right-0 mt-2 mr-2 flex items-center z-40">
                                                                <button onClick={() => toggleMenu(commentItem.id)} className="mt-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                                                                    <AiOutlineEllipsis className="text-lg" />
                                                                </button>
                                                                {selectedComment === commentItem.id && (
                                                                    <div className="absolute top-5 right-0 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-[100]" >
                                                                        <button onClick={() => handleEditClick(commentItem.id)} className="block w-full px-4 py-2 text-sm text-gray-800 text-left hover:bg-gray-100 focus:outline-none">
                                                                            Edit
                                                                        </button>
                                                                        <button onClick={() => deleteComment(commentItem.id)} className="block w-full px-4 py-2 text-sm text-gray-800 text-left hover:bg-gray-100 focus:outline-none">
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>



                                                </div>
                                            ))
                                        ) : (
                                            <div className="flex justify-center items-center p-4 text-gray-500">
                                                <p className="text-center">
                                                    This dream still has no comments! Be the first to comment.
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t border-gray-200 sticky bottom-0 bg-white  rounded-bl-lg rounded-br-lg">
                            <div className="flex items-end">
                                <img src="https://i.pinimg.com/736x/31/ec/2c/31ec2ce212492e600b8de27f38846ed7.jpg" alt="Avatar" className="w-10 h-10 rounded-full mr-4" />
                                <input
                                    type="text"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Write a comment..."
                                    className="w-full border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:border-teal-500"
                                />
                                <button onClick={createComment} className="ml-2 bg-teal-500 text-white rounded-full px-4 py-2 hover:bg-teal-600 focus:outline-none">
                                    Send
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}

        </>
    );
}