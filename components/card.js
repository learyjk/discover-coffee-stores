import Image from "next/image";
import Link from "next/link";

export const Card = ({ name, href, imgUrl }) => {
  return (
    <Link href={href}>
      <a className="">
        <h2 className="font-semibold text-2xl text-neutral-900">{name}</h2>
        <Image
          layout="responsive"
          objectFit="cover"
          width="100%"
          height={70}
          src={imgUrl}
          alt="alt"
        />
      </a>
    </Link>
  );
};
