import React, { useEffect } from "react";

import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import {
  getUserFriends,
  getRecommendedUsers,
  getOutgoingFriendRequests,
} from "../lib/api";
import { Link } from "react-router";
import { Users, MapPin, CheckCircle, UserPlus } from "lucide-react";
import NoFriends from "../components/NoFriends";
import FriendCard from "../components/FriendCard";
import {
  getLanguageFlag,
  capitalizeFirstLetter,
  formatLocation,
} from "../lib/utils.js";
import { sendFriendRequest, acceptFriendRequest } from "../lib/api.js";

const HomePage = () => {
  const queryClient = useQueryClient();

  const [outgoingRequestIDs, setOutgoingRequestIDs] = React.useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["Friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingRecommendedUsers } =
    useQuery({
      queryKey: ["recommendedUsers"],
      queryFn: getRecommendedUsers,
    });

  const { data: outgoingFriendRequests } = useQuery({
    queryKey: ["outgoingFriendRequests"],
    queryFn: getOutgoingFriendRequests,
  });

  const {
    mutate: sendFriendRequestMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendRequests"] });
    },
    onError: (error) => {
      console.error("Error sending friend request:", error);
    },
  });

  useEffect(() => {
    const outgoingIDs = new Set();
    if (outgoingFriendRequests && outgoingFriendRequests.length > 0) {
      outgoingFriendRequests.forEach((req) => {
        outgoingIDs.add(req.recepient._id);
      });
      setOutgoingRequestIDs(outgoingIDs);
    }
  }, [outgoingFriendRequests]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row items-start justify-between sm:items-center gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Your Friends
          </h2>
          <Link to="/notifications" className="btn btn-outline btn-sm">
            <Users className="w-4 h-4 mr-2" />
            Friend Requests
          </Link>
        </div>

        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriends />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        <section>
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start justify-between sm:items-center gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Recommended Users
                </h2>
                <p className="text-base-content opacity-70">
                  Connect with language partners below to start practicing
                  together!
                </p>
              </div>
            </div>
          </div>

          {loadingRecommendedUsers ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="card bg-base-200 p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">
                No recommended users available
              </h3>
              <p className="text-base-content opacity-70">
                Check back later for new recommendations!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestIDs.has(user._id);
                return (
                  <div
                    key={user._id}
                    className="card bg-base-200 hover:shadow-md transition-shadow p-4"
                  >
                    <div className="card-body p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="avatar size-12">
                          <img src={user?.profilePicture} alt={user?.name} />
                        </div>

                        <div className="flex flex-col justify-center">
                          <h3 className="font-semibold truncate">
                            {user?.name}
                          </h3>
                          {user.country && (
                            <div className="flex items-center text-xs opacity-70 mt-1">
                              <MapPin className="size-3 mr-1" />
                              {formatLocation(user?.country)}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <span className="badge badge-secondary  p-4">
                          <img
                            src={getLanguageFlag(user?.nativeLanguage)}
                            alt={user?.nativeLanguage}
                            className="inline-block h-3 mr-1"
                          />
                          Native: {capitalizeFirstLetter(user?.nativeLanguage)}
                        </span>
                        <span className="badge badge-outline p-4">
                          <img
                            src={getLanguageFlag(user?.learningLanguage)}
                            alt={user?.learningLanguage}
                            className="inline-block h-3 mr-1"
                          />
                          Learning:{" "}
                          {capitalizeFirstLetter(user?.learningLanguage)}
                        </span>
                      </div>

                      <button
                        className={`btn w-full mt-2 ${
                          hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                        }`}
                        onClick={() => sendFriendRequestMutation(user._id)}
                        disabled={hasRequestBeenSent || isPending}
                      >
                        {hasRequestBeenSent ? (
                          <>
                            <CheckCircle className="size-4 mr-2 " />
                            Request Sent
                          </>
                        ) : (
                          <>
                            <UserPlus className="size-4 mr-2" />
                            Send Friend Request
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
