import Image from "next/image";

export const ProfilePicture = () => (
    <Image
    src = "/images/profile.jpg"
    height={144}
    width={144}
    alt="Hello"
    />
);