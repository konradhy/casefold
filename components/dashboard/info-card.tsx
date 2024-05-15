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
      className="cursor-pointer border border-gray-300 p-4 bg-white shadow rounded"
           
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