import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

const Feed = () => {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const [userMetadata, setUserMetadata] = React.useState(null);

  React.useEffect(() => {
    if (!isAuthenticated || !user?.sub) {
      return;
    }
    const getUserMetadata = async () => {
      const domain = import.meta.env.VITE_AUTH0_DOMAIN;
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
          },
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { user_metadata } = await metadataResponse.json();

        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  return (
    <Stack
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isAuthenticated ? (
        <>
          <Typography variant="h1">welcome {user.name}</Typography>
          <Stack>
            <Typography variant="p">User Metadata</Typography>
            {userMetadata ? (
              <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
            ) : (
              "No user metadata defined"
            )}
          </Stack>
        </>
      ) : (
        <Typography variant="h1">Please log in</Typography>
      )}
    </Stack>
  );
};

export default Feed;
