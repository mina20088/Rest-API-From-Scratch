import {Router} from "./Router.ts";


export class StaticFile {


    private static Router = new Router()

    public static serve(path: string) {

          StaticFile.Router.get(path, async function (req){

            const mainFolder = req.params?.main

            const subFolder = req.params?.sub;

            const filename = req.params?.filename

            let readFile;

            if (subFolder == null)  readFile = await Deno.readFile(`${mainFolder}/${filename}`);

            readFile = await Deno.readFile(`${mainFolder}/${subFolder}/${filename}`);


            return new Response(readFile, {
                headers: {
                    'content-type': 'image/png',
                }
            })

        })
    }

}