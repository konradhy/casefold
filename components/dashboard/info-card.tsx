import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export interface InfoCardProps {
  fileName: string;
  description: string;
  creationTime: number;
  id: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  fileName,
  description,
  creationTime,
  id,
}) => {
  const router = useRouter();

  return (
    <Card
      onClick={() => {
        router.push(`/files/${id}`);
      }}
      className="cursor-pointer bg-white/20 dark:bg-gray-800/40 backdrop-blur-lg shadow-xl rounded-xl overflow-hidden border border-transparent dark:hover:bg-gray-700/50 hover:bg-orange-100/40 transition ease-in-out duration-300 h-full hover:shadow-xl"
    >
      <CardHeader>
        <Avatar>
          <AvatarFallback>{fileName[0]}</AvatarFallback>
          <AvatarImage src="/images/avatar.jpg" />
        </Avatar>
      </CardHeader>
      <CardContent>
        <CardTitle>{fileName}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">
          {formatDistanceToNow(new Date(creationTime), { addSuffix: true })}
        </p>
      </CardFooter>
    </Card>
  );
};
