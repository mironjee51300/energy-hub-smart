// api-client.ts

// This file is intended for frontend API communication.

const apiUrl = 'https://api.example.com'; // Replace with the actual API URL

export const fetchData = async (endpoint: string) => {
    const response = await fetch(`${apiUrl}/${endpoint}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const postData = async (endpoint: string, data: any) => {
    const response = await fetch(`${apiUrl}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};
