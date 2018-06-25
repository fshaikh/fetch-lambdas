#!/usr/bin/env node
//  make sure that your file(s) referenced in bin starts with #!/usr/bin/env node,
//  otherwise the scripts are started without the node executable!

import CLIController from "./controller/CLIController";

(async function(){
    const cliController: CLIController = new CLIController();
    await cliController.start();
})();