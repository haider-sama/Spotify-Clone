import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import PageContent from "@/components/PageContent";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
  
  return (
    <div className="bg-neutral-800 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-white font-bold text-3xl">Welcome Back!</h1>
        </div>
        <div className="grid grid-cols-1 gap-3 mt-4 
        sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <ListItem
          image="/images/liked.jpg" name="Liked Songs" href={"/liked"}/>
        </div>
      </Header>

      <div className="mt-2 mb-8 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-white text-2xl font-semibold">Recent</h1>
        </div>
        <PageContent songs={songs}/>
      </div>
    </div>
  );
}
