import java.util.Scanner;

public class TicTacToe
{  
   //declares the symbol character that will hold either "x" or "o"
   char symbol;
   
   //create a 3*3 array of characters that acts as the board in the game.
   char[][] board = new char[3][3];
   //declares multiple integers used throughout the game simulation
   int player = 1, row, col, numPlayers;
   //creates scanner object used to get user input
   Scanner kb = new Scanner(System.in);
   
   //constructor that fill the board array with dashes.
   public TicTacToe()
   {
      for(int i = 0; i <3; i++)
      {
         for(int j = 0; j < 3; j++)
            board[i][j] = '-';
      }   
   }
   
   //asks the user for the number of players
   public int getNumPlayers()
   {
      System.out.println("How many players are there (1 or 2)");
      numPlayers = kb.nextInt();
      return numPlayers;
   }
   
   //used to cycle through "x" and "o"
   public void setSymbol(int playerNumber)
   {
      if (playerNumber % 2 == 1)
         symbol = 'x';
      else 
         symbol = 'o';
   }  
   
   //prints the array as a 3*3 board
   public void printBoard()
   {
      for(int i = 0; i < 3; i++)
      {
         for(int j = 0; j<3; j++)
            System.out.print(board[i][j]);
         System.out.println();
      }   
   }
   
   //checks if there is an empty place on the board
   public boolean boardNotFilled()
   {
      for(int i = 0; i < 3; i++)
      {
         for(int j = 0; j < 3; j++)
         {
            if(board[i][j] == '-') 
               return true;
         }
      }
      return false;
    }
   
   //checks if someone has won the game  
   public boolean checkGameOn()
   {
      if(board[0][0] == board[0][1] && board[0][1] == board[0][2] && board[0][0] != '-')
         return false;
      else if(board[1][0] == board[1][1] && board[1][1] == board[1][2] && board[1][0] != '-')
         return false;
      else if(board[2][0] == board[2][1] && board[2][1] == board[2][2] && board[2][0] != '-')
         return false;
      else if(board[0][0] == board[1][0] && board[1][0] == board[2][0] && board[0][0] != '-')
         return false;
      else if(board[0][1] == board[1][1] && board[1][1] == board[2][1] && board[0][1] != '-')
         return false;
      else if(board[0][2] == board[1][2] && board[1][2] == board[2][2] && board[0][2] != '-')
         return false;
      else if(board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != '-')
         return false;
      else if(board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != '-')
         return false;
      else
         return true;
   }
   
  //ask user for a row. The number is decreased by one to get to the corresponding index
  public void getRow()
  {
     System.out.println("Enter a row: ");
     row = kb.nextInt() - 1;
     //return row;
  } 
  
  //ask user for a column. The number is decreased by one to get to the corresponding index
  public void getColumn()
  {
     System.out.println("Enter a column: ");
     col = kb.nextInt() - 1;
     //return col;
  } 
  
  //switches the value at a point from a "-" to the symbol
  public boolean switchVal()
  {
      board[row][col] = symbol;
       return false;
  }
  
  //selects to random numbers for a computer move. Keeps running until an empty index is found.
  public void compMove()
  {
     while(true)
     {
        row = (int)(Math.random()*3);
        col = (int)(Math.random()*3);
        if(board[row][col] == '-')
           break;
     }
  }
  
  //Prints winner for a 2 player game
  public void winStatement()
  {
     if(symbol == 'x')
        System.out.println("Congratulations Player 1, you win");
     else
       System.out.println("Congratulations Player 2, you win");
  }
  
  //simulates a single player game
  public void singlePlayer()
  {
     int playerNum = 1;
      
      TicTacToe game = new TicTacToe();
      
      while (game.checkGameOn() && game.boardNotFilled())
      {
         game.printBoard();
         if(playerNum != 1)
         {
            System.out.println();
            System.out.println("I made my move! Your turn.");
            System.out.println(); 
         }
         game.setSymbol(playerNum);
         game.getRow();
         game.getColumn();
         game.switchVal();
         game.printBoard();
         System.out.println();
         System.out.println("Computer's turn!");
         System.out.println();
         playerNum++;
         game.setSymbol(playerNum);
         game.compMove();
         game.switchVal();
         playerNum++;
      }
      
      game.printBoard();
      if(game.boardNotFilled())
         System.out.println("Congratulations, you win!");
      else
         System.out.println("Game Tied");
  }
  
  //simulates a two player game
  public void twoPlayer()
  {
     int playerNum = 1;
      
      TicTacToe game = new TicTacToe();
      
      while (game.checkGameOn() && game.boardNotFilled())
      {
         game.printBoard();
         game.setSymbol(playerNum);
         game.getRow();
         game.getColumn();
         game.switchVal();
         playerNum++;
      }
      
      game.printBoard();
      if(game.boardNotFilled())
         game.winStatement();
      else
         System.out.println("Game Tied");
  }
  
  //simulates everything from asking user how many players all the way to running the game.
  public void play()
  {
     TicTacToe game = new TicTacToe();
     int  numPlayers = game.getNumPlayers();
     if(numPlayers == 1)
        game.singlePlayer();
     else if(numPlayers == 2)
        game.twoPlayer();
     else
        System.out.println("Error");
  }
}