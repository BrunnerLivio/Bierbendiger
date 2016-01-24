<?php
class PublicController extends Controller {
    public function __construct(){
        parent::__construct("public");
    }
    public function Map(){
        $this->Route( 'GET', '/todoentry', function() {
            $todoEntryRepository = new TodoEntryRepository;
            $entries = $todoEntryRepository->LoadWhere("Public = 1", [["CreatorUserId" => "user", "ProofPhotoId" => "media"]]);
            $counter = 0;
            while($counter < count($entries)){
                unset($entries[$counter]["Public"]);
                unset($entries[$counter]["user"]["Email"]);
                $counter++;
            }
            $this->Send($entries);
        });
        $this->Route( 'GET', '/entryoftheday', function() {
            $entryOfTheDayRepository = new EntryOfTheDayRepository;
            $entries = $entryOfTheDayRepository->LoadOrderBy("RAND() LIMIT 1", [["UserId" => "user"]]);
            $entry = $entries[0];
            $this->Send([
                "Message" => $entry["Message"],
                "user" => [
                    "Id" => $entry["user"]["Id"],
                    "Username" => $entry["user"]["Username"],
                    "Profilepicture" => $entry["user"]["Profilepicture"]
                ]
            ]);
        });
        $this->Route('GET', '/user-count', function(){
            $userRepository = new UserRepository;
            $number = count($userRepository->LoadAll());
            $this->Send(array("amount"=> $number));
        });
        $this->Route('GET', '/users', function(){
            $userRepository = new UserRepository;
            $users = $userRepository->LoadAll();
            $counter = 0;
            while($counter < count($users)){
                unset($users[$counter]["Password"]);   
                unset($users[$counter]["Email"]);
                $counter++;
            }
            $this->Send($users);
        });
    }
}
?>