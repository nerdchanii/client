import React, { useCallback } from 'react';
import Errpage from '../../Pages/Errpage/Errpage';

const UserProfileEditor = ({ draftingUserInfo, edit, setDraftingUserInfo }) => {
  const onChange = useCallback(
    (e) => {
      setDraftingUserInfo({
        ...draftingUserInfo,
        [e.target.name]: e.target.value,
      });
    },
    [draftingUserInfo],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      setDraftingUserInfo({
        ...draftingUserInfo,
        [e.target.name]: e.target.value,
      });
    },
    [draftingUserInfo],
  );
  const onChangeImg = useCallback(
    (e) => {
      console.log(e.target.files[0]);
      const file = new File(
        [e.target.files[0]],
        `${draftingUserInfo.nickName}.jpg`,
        {
          type: 'image/jpeg',
        },
      );
      setDraftingUserInfo({
        ...draftingUserInfo,
        [e.target.name]: URL.createObjectURL(file),
      });
    },
    [draftingUserInfo],
  );

  if (!draftingUserInfo) {
    return (
      <div>
        <Errpage log="user정보가 없습니다" />
      </div>
    );
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="UserProfile">
        <div className="imgContainer">
          <img src={draftingUserInfo.img} sizes="128" alt="userProfile" />
          {edit ? (
            <>
              <label htmlFor="changeImage">📷이미지 변경</label>
              <input
                id="changeImage"
                type="file"
                name="img"
                accept="image/*"
                onChange={onChangeImg}
              />
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="textContainer">
          <div className="nickname">
            <label className="nicknameLabel">nickName:</label>

            <input
              disabled={!edit}
              name="nickName"
              value={draftingUserInfo.nickName}
              onChange={onChange}
            />
          </div>
          <p className="email">
            email:
            <span>{draftingUserInfo.email}</span>
          </p>
          <p className="rank">
            rank:
            <span>{draftingUserInfo.rank}</span>
          </p>
          <p className="points">
            points:
            <span>{draftingUserInfo.points}</span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default UserProfileEditor;
