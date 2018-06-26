# fetch-lambdas
Fetch lambdas for AWS account from all regions

## Motivation
AWS Lambda makes it super easy to create functions and before you know it, you have piled up a stack of lambdas for
test/POC/learning purposes. Dead Lambdas are a ripe target for security attacks and increase your attack surface. Anything deployed is
exposed to outside world and thus you need to keep a tight leash on anything unwanted and tighten control on your architecture.
This begs the question: How do you cleanup “Dead” Lambdas? Use fetch-lambdas.
   fetch-lambda is a NPM package which enumerates your Lambda functions across all AWS regions and provides useful metadata,
such as the function’s last modified time, its last invocation time and more. It can help identifying dead Lambda functions easily.
Inspired by : https://medium.com/epsagon/the-curse-of-dead-lambda-functions-228bf812c10a


## Setup
.. code-block:: bash

    git clone https://github.com/fshaikh/fetch-lambdas
    cd fetch-lambdas/
    npm install
    npm run build
    fetch-lambdas --accessKey= --secretKey= --csv=lambdas.csv

## Example Outputs

Console:

CSV:

![CSV Output](https://github.com/fshaikh/fetch-lambdas/blob/master/CSV-output.JPG)

## Usage
.. code-block:: bash

    fetch-lambdas --accessKey= --secretKey= [--csv=lambdas.csv] [--all] [--sort=<column_name>]

## Description
 Fetches lambdas from all regions along with interesting metadata.Metadata includes:
       Region, Name, Last Modified, Last Invocation, Memory (MB), Code Size (MB), Timeout(seconds),Runtime, Description.
       Sort entries by AWS region if --sort is not specified

       -accessKey
            API Access Key of the AWS account for which the Lambdas are to be fetched
        -secretKey
            Secret Key of the AWS account for which the Lambdas are to be fetched
        -csv
            CSV file name which will contain the results. 
        -all
            Show all metadata in columns in the console output
        -sortBy
            Sort column name. Valid values are:
                        last-invocation
                        last-modified
                        memory
                        code-size
                        runtime
                        name
                        region
