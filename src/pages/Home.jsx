import * as React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Copyright from "../Copyright";

const Home = () => {
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();
  const [userMetadata, setUserMetadata] = React.useState(null);

  React.useEffect(() => {
    if (!isAuthenticated) {
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

  // confirm the SDK has finished loading before accessing the isAuthenticated property
  if (isLoading) {
    return <Stack>Loading...</Stack>;
  }

  return (
    <Container maxWidth="sm">
      <Stack
        sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}
      >
        <Box sx={{ my: 4 }}>
          {/* Confirm the user is authenticaed before accessing the user property */}
          {isAuthenticated ? (
            <>
              <Box>
                <Stack direction="row">
                  <img src={user.picture} alt="user profile picture" />
                  <Typography variant="h3">Welcome {user.name}</Typography>
                </Stack>
                <Typography variant="p">{user.email}</Typography>
                <Stack>
                  <Typography variant="p">User Metadata</Typography>
                  {userMetadata ? (
                    <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
                  ) : (
                    "No user metadata defined"
                  )}
                </Stack>
              </Box>
              <Link to="/feed">
                <Button variant="contained">Feed</Button>
              </Link>
              <Button variant="contained" onClick={() => logout()}>
                Logout
              </Button>
            </>
          ) : (
            <Box>
              <Button variant="contained" onClick={() => loginWithRedirect()}>
                Login
              </Button>
              <Button variant="contained">Sign Up</Button>
            </Box>
          )}
          <Copyright />
        </Box>
      </Stack>
    </Container>
  );
};

export default Home;
