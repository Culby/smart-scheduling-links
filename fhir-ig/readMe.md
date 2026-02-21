# Patient Scheduling FHIR Implementation Guide

Below are the step on how to run the IG locally on your PC.

### Installation Steps 
1. Install nodejs   
   https://nodejs.org/en/download/

2. Install java JDK 17 or above 
   https://www.oracle.com/java/technologies/downloads/

3. Install Ruby and Ruby gems  
https://www.ruby-lang.org/en/documentation/installation/

3. Install Jekyll gem
 
      `gem install jekyll `

4. Install Sushi
  
   `npm install -g fsh-sushi
        sushi --help `

5. Update IG Publisher

      `./_updatePublisher.sh`

6. Run IG Publisher

    ` ./_genonce.sh`

7. Open Published IG Static files under the `./output/` folder and view the built IG in the browser
   
