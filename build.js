import fs from 'node:fs';
import { exec } from 'node:child_process';
import { errorMonitor } from 'node:events';

const folderPath = '.';

const aFolders = await fs.promises.readdir(folderPath);

for(const sFolder of aFolders){
    const oStats = await fs.promises.lstat(sFolder);
    if(!['dist','.git', 'node_modules', '.github', '.devcontainer'].includes(sFolder) && oStats.isDirectory()){
        exec(`R -e 'rmarkdown::render("${sFolder}/slides.Rmd", output_format = "html_document", output_dir = "dist/${sFolder}")'`, {}, (error, stdout, stderr)=>{
            if(error){
                throw `${error}, ${stdout}, ${stderr}`;
            }
            exec(`R -e 'rmarkdown::render("${sFolder}/slides.Rmd", output_format = "powerpoint_presentation", output_dir = "dist/${sFolder}")'`, {}, (error, stdout, stderr)=>{
                if(error){
                    throw `${error}, ${stdout}, ${stderr}`;
                }

            });
        });
    }
}

