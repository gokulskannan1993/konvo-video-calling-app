import React from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { acceptFriendRequest, getFriendRequests } from "../lib/api.js";
import { Clock, UserCheck, MessageSquare } from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";

const NotificationPage = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptFriendRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(["friendRequests"]);
      queryClient.invalidateQueries(["friends"]);
    },
  });

  const incomingRequests = friendRequests?.incomingRequests || [];
  const acceptedRequests = friendRequests?.acceptedRequests || [];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
          {" "}
          Notifications
        </h1>
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            {incomingRequests.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-primary" />
                  Friend Requests
                  <span className="badge badge-primary ml-2">
                    {incomingRequests.length}
                  </span>
                </h2>
                <div className="space-y-3">
                  {incomingRequests.map((request) => (
                    <div
                      key={request._id}
                      className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="card-body p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="avatar w-14 h-14 rounded-full bg-base-300">
                              <img
                                src={request.sender.profilePicture}
                                alt={request.sender.name}
                              />
                            </div>
                            <div>
                              <h3 className=" font-semibold">
                                {request.sender.name}
                              </h3>
                              <div className="flex flex-wrap gap-1.5 mt-1">
                                <span className="badge badge-secondary badge-sm">
                                  Native: {request.sender.nativeLanguage}
                                </span>
                                <span className="badge badge-outline badge-sm">
                                  Learning: {request.sender.learningLanguage}
                                </span>
                              </div>
                            </div>
                          </div>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() =>
                              acceptFriendRequestMutation(request._id)
                            }
                            disabled={isPending}
                          >
                            {isPending ? "Accepting..." : "Accept"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {/* Accepted requests section  */}

            <div className="space-y-3">
              {acceptedRequests.map((notification) => (
                <div
                  key={notification._id}
                  className="card bg-base-200 shadow-sm"
                >
                  <div className="card-body p-4">
                    <div className="flex items-center gap-3">
                      <div className="avatar size-10 mt-1 rounded-full">
                        <img
                          src={notification.recepient.profilePicture}
                          alt={notification.recepient.name}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          {notification.recepient.name}
                        </h3>
                        <p className="text-sm my-1">
                          {notification.recepient.name} accepted your friend
                          request.
                        </p>
                        <p className="text-xs flex items-center opacity-70">
                          <Clock className="w-3 h-3 mr-1" />
                          Recently
                        </p>
                      </div>
                      <div className="badge badge-success">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        New Friend
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
          <NoNotificationsFound />
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
