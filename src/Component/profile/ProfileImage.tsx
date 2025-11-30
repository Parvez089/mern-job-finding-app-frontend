"use client";

import React from "react";
import { Image } from "antd";

const ProfileImage = () => {
  return (
    <Image
      width={200}
      alt="basic image"
      preview={{
        imageRender: () => (
          <video
            muted
            width="100%"
            controls
            src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/file/A*uYT7SZwhJnUAAAAAAAAAAAAADgCCAQ"
          />
        ),
        toolbarRender: () => null, // ❗ correct replacement
      }}
      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    className="rounded"/>
  );
};

export default ProfileImage;
