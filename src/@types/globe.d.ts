interface Base {
  userId: number;
  id: number;
}

//interface post
interface Post extends Base {
  title: string;
  body: string;
}
interface PostComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

//interface album
interface Album extends Base {
  title: string;
}
interface AlbumPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
