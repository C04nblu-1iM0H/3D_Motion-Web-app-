import ProfilImage from "./ui/ProfilImage";
import ProfilMenu from "./ui/ProfilMenu";

export default function ProfileAvatar({image, sassionName, email}) {
    return(
        <div className="w-[260px] bg-layout border-gray-200 mt-[-1rem]">
            <ProfilImage image={image} sassionName={sassionName} email={email}/>
            <ProfilMenu />
        </div>   
    )
}