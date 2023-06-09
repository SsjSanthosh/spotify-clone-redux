export const USER_ENDPOINT = "/users/{user_id}";

export const MY_PROFILE_ENDPOINT = "/me";

export const USER_PLAYLISTS_ENDPOINT = "/users/{user_id}/playlists?limit=50";

export const PLAYLIST_ENDPOINT = "/playlists/{playlist_id}";

export const GENRES_ENDPOINT =
  "/browse/categories?country=IN&locale=in&offset=0&limit=35";

export const SEARCH_ENDPOINT =
  "/search?query={search_query}&type={type}&market=IN&locale=en-IN%2Cen%3Bq%3D0.9&offset=0&limit=50";

export const PLAYER_ENDPOINT = "/me/player";

export const PLAYER_PLAY_ENDPOINT = "/me/player/play";

export const PLAYER_PAUSE_ENDPOINT = "/me/player/pause";

export const PLAYER_NEXT_ENDPOINT = "/me/player/next";

export const PLAYER_PREV_ENDPOINT = "/me/player/previous";

export const PLAYER_SHUFFLE_ENDPOINT = "/me/player/shuffle?state={state}";

export const PLAYER_REPEAT_ENDPOINT = "/me/player/repeat?state={state}";

export const VOLUME_ENDPOINT = "/me/player/volume?volume_percent={volume}";

export const SEEK_ENDPOINT = "/me/player/seek?position_ms={position}";

export const USER_TRACKS_ENDPOINT = "/me/tracks?limit=50";

export const ARTIST_ENDPOINT = "/artists/{id}";

export const ALBUM_ENDPOINT = "/albums/{id}";

export const ARTIST_TOP_TRACKS_ENDPOINT = `/artists/{id}/top-tracks?market=IN`;

export const ARTIST_ALBUMS_ENDPOINT = `/artists/{id}/albums?include_groups=single,appears_on&market=IN`;

export const RELATED_ARTISTS_ENDPOINT = `/artists/{id}/related-artists`;

export const FEATURED_PLAYLISTS_ENDPOINT = `/browse/featured-playlists?country=IN&locale=en_IN&limit=20`;

export const USER_ALBUMS_ENDPOINT = `/me/albums?limit=20`;

export const SAVE_TRACK_ENDPOINT = `/me/tracks`;

export const USER_DEVICES_ENDPOINT = `/me/player/devices`;