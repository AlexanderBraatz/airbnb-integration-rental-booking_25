import Image from 'next/image';
import mountain from '@/public/images/mountain-blue-upscaled.jpeg';
import m11147017 from '@/public/images/11147017.png';
import mountainpnd from '@/public/images/upscalemedia-transformed.png';

export default function Home() {
	return (
		<div className="bg-amber-700 h-screen overflow-y-auto overflow-x-hidden perspective-[24px]">
			<header className="flex justify-center items-center h-full transform-3d z-[-1]">
				<div className="bg-gradient-to-b from-blue-500 to-blue-50 h-screen w-screen shrink-0 absolute z-[-1] -translate-z-6 scale-[2]"></div>
				<Image
					src={mountainpnd}
					alt="picture of mountain view from the balcony"
					className="absolute h-full w-full object-cover z-[-1] -translate-z-3 scale-[1.51]"
				/>
				<div>
					<h1 className="text-white text-shadow-lg text-4xl font-extrabold tracking-tight text-balance">
						Stay In the Mountains,
					</h1>
					<h1 className="text-white text-shadow-lg text-4xl font-extrabold tracking-tight text-balance">
						without leaving the homely feel behind.
					</h1>
				</div>
			</header>
			<section className="text-2xl p-8 bg-blue-950 text-blue-50 ">
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione fuga
				obcaecati voluptatum similique, enim pariatur optio quae harum magni
				dolorum blanditiis eum doloribus necessitatibus minima architecto
				explicabo numquam, ducimus deserunt ab itaque facilis nobis delectus
				vitae! Corporis odit hic veritatis cupiditate autem nisi tenetur iste
				quam delectus blanditiis molestias obcaecati harum ea veniam enim sint
				asperiores ratione impedit corrupti nam, debitis facere possimus cum!
				Deserunt ipsum omnis qui? Optio porro quisquam vero ullam earum
				obcaecati reprehenderit! Non, fuga corrupti a vel ullam reprehenderit
				dicta ex eum nisi? Id possimus eius voluptatem, laboriosam fuga itaque
				illo repudiandae. Facilis minus est quam ad, aspernatur officia
				voluptatibus eos optio laborum voluptas dolorum, inventore reprehenderit
				hic impedit iusto! Blanditiis quidem dicta ab modi dolorem numquam
				repudiandae rerum sequi, excepturi voluptatum quae nulla veniam! Natus
				repudiandae reiciendis nulla beatae eligendi, porro, vel minima
				similique esse, dolore sit laudantium eum ratione. Dolorum itaque quidem
				nam quaerat architecto corporis aperiam possimus porro delectus illo
				temporibus libero est labore sequi id ut numquam magni, aliquam, tenetur
				aliquid perferendis? Quaerat, molestias facilis? Sequi veniam soluta
				iure quo ducimus, dicta illo voluptates modi dignissimos consequuntur
				saepe molestiae repudiandae aliquam explicabo quasi id suscipit?
				Inventore assumenda laudantium delectus, vel nobis error ab quidem est
				asperiores voluptatem nihil, nostrum natus itaque? Totam, deserunt
				suscipit? Asperiores commodi qui eum, neque dolorum aut harum sed vel
				rem. Commodi cupiditate placeat eveniet! Corporis delectus nostrum
				veritatis nisi aliquam atque expedita, obcaecati ad quia magnam ipsam
				quasi. Rerum culpa rem maxime consequuntur nihil pariatur? Minima qui
				natus perferendis. Sequi ex mollitia magni esse qui illum, aliquid
				incidunt alias repellendus voluptatum quam, ratione perspiciatis!
				Possimus perferendis repellendus ipsam ad quod reiciendis tempore
				sapiente corporis eaque cum nisi veritatis quas, doloremque unde fuga
				veniam suscipit rerum? Molestiae quia aspernatur suscipit neque ipsum
				doloribus fugit, recusandae numquam, non saepe earum quae blanditiis
				laborum tempore voluptatem vel repellendus quis et quos nulla? Aliquam
				perferendis quod, laborum fuga expedita, odit alias sed ducimus neque
				sapiente eveniet ab nihil minus modi quis quisquam saepe consequuntur
				vel? Quaerat dolorem vero iusto laudantium at eligendi blanditiis esse
				voluptatibus veniam. Dolorum, iure saepe perspiciatis consequatur, alias
				quam quibusdam explicabo libero laboriosam et obcaecati quisquam ipsum
				omnis sequi sed dignissimos sit voluptatum nam modi, error minima.
				Doloremque odio sapiente cum est quo laborum ab nesciunt voluptate quam
				saepe. Saepe veniam nihil error consequatur quae? Est quam corrupti
				aliquid quas cumque adipisci nemo eos nesciunt dignissimos sapiente
				similique, ea molestiae animi totam perferendis asperiores consectetur
				dolorum enim vel blanditiis numquam! Eos neque dolorum magni cum quis!
				Voluptate fugit, ipsum delectus facilis molestias consequuntur eius
				nobis hic alias molestiae magni quod, provident quae velit repudiandae
				optio voluptatum, nulla deleniti nisi rem id ab a debitis! Adipisci
				mollitia autem illo voluptate deleniti nesciunt quasi nam doloribus
				nobis! Harum excepturi repudiandae culpa unde sint minus maxime
				voluptatum error modi doloremque accusantium inventore numquam ex, dolor
				sapiente nam. Commodi rem suscipit nam dolorem? Magni itaque soluta
				dolorum dolores iste. Tenetur quam modi voluptatibus culpa autem ab sit
				incidunt? Tempora, corrupti repellendus?
			</section>
		</div>
	);
}
