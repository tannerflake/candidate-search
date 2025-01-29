import Candidate from '../interfaces/Candidate.interface';

const searchGithub = async (): Promise<Candidate[]> => {
  try {
    console.log('GitHub Token:', import.meta.env.VITE_GITHUB_TOKEN); // Verify token
    const start = Math.floor(Math.random() * 100000000) + 1;
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );
    console.log('Response:', response);
    const users = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    console.log('Users:', users);

    // Fetch additional details for each user
    const candidates = await Promise.all(
      users.map(async (user: any) => {
        const userDetailsResponse = await fetch(
          `https://api.github.com/users/${user.login}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
            },
          }
        );
        const userDetails = await userDetailsResponse.json();
        return {
          id: userDetails.id,
          login: userDetails.login,
          avatar_url: userDetails.avatar_url,
          html_url: userDetails.html_url,
          name: userDetails.name || 'N/A',
          location: userDetails.location || 'N/A',
          email: userDetails.email || 'N/A',
          company: userDetails.company || 'N/A',
        } as Candidate;
      })
    );

    console.log('Candidates:', candidates);
    return candidates;
  } catch (err) {
    console.error('An error occurred:', err);
    return [];
  }
};

const searchGithubUser = async (username: string): Promise<Candidate | {}> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    const userDetails = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    return {
      id: userDetails.id,
      login: userDetails.login,
      avatar_url: userDetails.avatar_url,
      html_url: userDetails.html_url,
      name: userDetails.name || 'N/A',
      location: userDetails.location || 'N/A',
      email: userDetails.email || 'N/A',
      company: userDetails.company || 'N/A',
    } as Candidate;
  } catch (err) {
    console.log('an error occurred', err);
    return {};
  }
};

export { searchGithub, searchGithubUser };