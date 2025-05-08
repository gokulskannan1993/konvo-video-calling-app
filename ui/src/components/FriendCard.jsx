import React from "react";
import {
  getLanguageFlag,
  capitalizeFirstLetter,
  formatLocation,
} from "../lib/utils.js";
import { Link } from "react-router";

const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12">
            <img src={friend?.profilePicture} alt={friend?.name} />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="font-semibold truncate">{friend?.name}</h3>
            {friend.country && (
              <div className="flex items-center text-xs opacity-70 mt-1">
                <MapPin className="size-3 mr-1" />
                {formatLocation(friend?.country)}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-secondary text-xs">
            <img
              src={getLanguageFlag(friend?.nativeLanguage)}
              alt={friend?.nativeLanguage}
              className="inline-block h-3 mr-1"
            />
            Native: {capitalizeFirstLetter(friend?.nativeLanguage)}
          </span>
          <span className="badge badge-primary text-xs">
            <img
              src={getLanguageFlag(friend?.learningLanguage)}
              alt={friend?.learningLanguage}
              className="inline-block h-3 mr-1"
            />
            Learning: {capitalizeFirstLetter(friend?.learningLanguage)}
          </span>
        </div>
        <Link to={`/chat/${friend?._id}`} className="btn btn-outline   w-full">
          Message
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;
