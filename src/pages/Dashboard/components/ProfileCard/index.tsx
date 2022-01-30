import React from 'react';

import { ProfileContainer, ImageContainer, UserData } from './styles';

export default function ProfileCard({ user }) {
  return (
    user?.name && (
      <ProfileContainer>
        <ImageContainer>
          <img src={user?.avatar_url} alt="Avatar" />
        </ImageContainer>
        <UserData>
          <div>
            <h1> {user?.name}</h1>
            <span>@{user?.login}</span>
          </div>

          <p>{user?.bio}</p>

          <ul>
            <li>
              {user?.public_repos && (
                <>
                  <h1>{user?.public_repos}</h1>
                  <span>Repositórios</span>
                </>
              )}
            </li>
            <li>
              {user?.following && (
                <>
                  <h1>{user.following}</h1>
                  <span>Seguindo</span>
                </>
              )}
            </li>
            <li>
              {user?.followers && (
                <>
                  <h1>{user.followers}</h1>
                  <span>Seguidores</span>
                </>
              )}
            </li>
          </ul>
        </UserData>
      </ProfileContainer>
    )
  );
}
