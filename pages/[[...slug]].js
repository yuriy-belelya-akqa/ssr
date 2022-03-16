import Link from "next/link";

export default function Page({ home, isValidSlug, slug }) {
  return (
    <div>
      <div>Slug: {JSON.stringify(slug)}</div>
      <div>
        <Link href="/">
          <a>Home [staging]</a>
        </Link>
      </div>
      <div>
        <Link href="/about">
          <a>About Us</a>
        </Link>
      </div>
      <div>
        <Link href="/work">
          <a>Work</a>
        </Link>
      </div>
      <div>
        <Link href="/work/project">
          <a>Work Project</a>
        </Link>
      </div>
    </div>
  );
}

class SlugController {
  getStaticPaths() {
    return [];
  }
  validateSlug(slug) {
    return true;
  }
}
const slugController = new SlugController();

export async function getStaticProps(context) {
  const { slug } = context.params;
  const home = !slug;

  const isValidSlug = slugController.validateSlug(slug);
  if (!isValidSlug) return { notFound: true };

  return {
    revalidate: 1,
    props: {
      home,
      isValidSlug,
      slug: home ? [] : slug
    }
  };
}

export async function getStaticPaths() {
  // const paths = slugController.getStaticPaths();

  return {
    paths: [
      {
        params: { slug: false }
      },
      {
        params: { slug: ["work"] }
      }
    ],
    fallback: true
  };
}
