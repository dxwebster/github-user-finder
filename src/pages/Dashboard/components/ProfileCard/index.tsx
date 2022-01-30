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
              <h1>{user.public_repos || '0'}</h1>
              <span>Repositórios</span>
            </li>

            <li>
              <h1>{user.following || '0'}</h1>
              <span>Seguindo</span>
            </li>

            <li>
              <h1>{user.followers || '0'}</h1>
              <span>Seguidores</span>
            </li>
          </ul>
        </UserData>
      </ProfileContainer>
    )
  );
}
