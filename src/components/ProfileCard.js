import React from "react";

const ProfileCard = ({ profile, gravatarData, gravatarUrl }) => {
  const { fullName, username, email, phone, location, website, bio } = profile;

  // Extract Gravatar data or fall back to the form values
  const gravatarUsername = gravatarData?.display_name || username;
  const gravatarLocation = gravatarData?.location || location;
  const gravatarBio = gravatarData?.description || bio;
  const gravatarImage = gravatarData?.avatar_url || gravatarUrl; // Default to gravatarUrl if no avatar
  const gravatarPronunciation = gravatarData?.pronunciation || '';
  const gravatarPronouns = gravatarData?.pronouns || '';

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-6">
      <div className="flex items-center justify-center p-4">
        <img
          className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
          src={gravatarImage}
          alt={fullName}
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800">{fullName}</h2>
        <p className="text-lg text-gray-600">{gravatarUsername}</p>

        {gravatarPronunciation && (
          <p className="text-sm text-gray-600">
            <strong>Pronunciation:</strong> {gravatarPronunciation}
          </p>
        )}

        {gravatarPronouns && (
          <p className="text-sm text-gray-600">
            <strong>Pronouns:</strong> {gravatarPronouns}
          </p>
        )}

        <div className="mt-4">
          <p className="text-gray-600">
            <strong>Location:</strong> {gravatarLocation || "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>Email:</strong> {email}
          </p>
          <p className="text-gray-600">
            <strong>Phone:</strong> {phone || "N/A"}
          </p>
        </div>

        {gravatarBio && (
          <div className="mt-4">
            <h3 className="font-medium text-gray-800">Bio</h3>
            <p className="text-gray-600">{gravatarBio}</p>
          </div>
        )}

        {website && (
          <div className="mt-4">
            <h3 className="font-medium text-gray-800">Website/Social Link</h3>
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              {website}
            </a>
          </div>
        )}

        {gravatarData?.job_title && gravatarData?.company && (
          <div className="mt-4">
            <p className="text-gray-600">
              <strong>Job Title:</strong> {gravatarData.job_title}
            </p>
            <p className="text-gray-600">
              <strong>Company:</strong> {gravatarData.company}
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default ProfileCard;
