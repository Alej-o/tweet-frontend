import Image from 'next/image';

function Logo() {
    return (
        <Image className="rotate-180" width={80} height={80} src="/logo-twitter.png" />
    )
}

export default Logo
    