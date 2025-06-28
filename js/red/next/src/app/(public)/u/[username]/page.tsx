import React from "react";

interface UserProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function UserProfilePage({
  params,
}: UserProfilePageProps) {
  const { username } = await params;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">
        Профиль пользователя: {username}
      </h1>
      <div className="bg-white shadow rounded-lg p-6">
        {/* Содержимое профиля будет добавлено здесь */}
        <p className="text-gray-500">Страница профиля в разработке...</p>
      </div>
    </div>
  );
}
