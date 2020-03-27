package Quest;

import java.util.*;
class Scheduler {

  public Quest[] sortQuests(Quest[] quests) {
    int n = quests.length;

    for (int i = n / 2 - 1; i >= 0; i--) {
      heapify(quests, n, i);
    }

    for (int i = n - 1; i >= 0; i --) {
      Quest temp = quests[0];
      quests[0] = quests[i];
      quests[i] = temp;

      heapify(quests, i, 0);
    }

    return quests;
  }

  public void heapify(Quest[] quests, int n, int i) {
      int largest = i;
      int l = 2*i + 1;
      int r = 2*i + 2;

      if (l < n && (quests[l].duration+quests[l].startDate) > (quests[largest].duration+quests[largest].startDate))
        largest = l;
      if (r < n && (quests[r].duration+quests[r].startDate) > (quests[largest].duration+quests[largest].startDate))
        largest = r;

      if (largest != i) {
        Quest swap = quests[i];
        quests[i] = quests[largest];
        quests[largest] = swap;
        heapify(quests, n, largest);
      }
  }

  public void printQuests(Quest[] quests) {
    System.out.println("Sorted quests: ");
    for (int i = 0; i < quests.length; i++) {
      System.out.println(quests[i].quest + ", " + quests[i].startDate + ", " + quests[i].duration + ", " + quests[i].reward);
    }
    System.out.println("\n");
  }

  public void printOptimalQuests(ArrayList<Quest> quests) {
    int maxRupees = 0;
    System.out.println("Link's Optimal Quests: ");
    for (int i = 0; i < quests.size(); i++) {
      System.out.println(quests.get(i).quest + ", " + quests.get(i).startDate + ", " + quests.get(i).duration + ", " + quests.get(i).reward);
      maxRupees += quests.get(i).reward;
    }
    System.out.println("The maximum amount of rupees Link can earn: " + maxRupees);
  }

  public ArrayList<Quest> findOptimalQuests(Quest[] quests) {
    quests = sortQuests(quests);
    ArrayList<Quest> optimalQuests = new ArrayList<Quest>();
    optimalQuests.add(quests[0]);
    int k = 0;
    int n = quests.length;

    for (int i = 1; i < n; i++) {
      if (quests[i].startDate >= (quests[k].duration+quests[k].startDate)) {
        optimalQuests.add(quests[i]);
        k = i;
      }
    }
    return optimalQuests;

  }

  public static void main(String[] args) {

    Quest[] quests = new Quest[24];
    quests[0] = new Quest("Robbie's Research", 1, 3, 750);
    quests[1] = new Quest("A Parent's Love", 2, 2, 500);
    quests[2] = new Quest("The Weapon Connoisseur", 1, 4, 920);
    quests[3] = new Quest("Sunshroom Sensing", 3, 8, 1050);
    quests[4] = new Quest("Sunken Treasure", 5, 1, 200);
    quests[5] = new Quest("Cooking with Koko", 3, 4, 400);
    quests[6] = new Quest("Arrows of Burning Heat", 7, 5, 1200);
    quests[7] = new Quest("Stalhorse: Pictured!", 12, 3, 370);
    quests[8] = new Quest("Curry for What Ails You", 6, 8, 840);
    quests[9] = new Quest("The Jewel Trade", 19, 2, 165);
    quests[10] = new Quest("Slated for Upgrades", 23, 7, 1520);
    quests[11] = new Quest("Medicinal Molduga", 14, 4, 600);
    quests[12] = new Quest("Tools of the Trade", 8, 3, 430);
    quests[13] = new Quest("A Gift for the Great Fairy", 20, 7, 1100);
    quests[14] = new Quest("A Rare Find", 28, 3, 590);
    quests[15] = new Quest("Frog Catching", 10, 4, 900);
    quests[16] = new Quest("Luminous Stone Gathering", 13, 6, 230);
    quests[17] = new Quest("A Freezing Rod", 25, 4, 1120);
    quests[18] = new Quest("Rushroom Rush!", 9, 1, 460);
    quests[19] = new Quest("The Hero's Cache", 16, 10, 780);
    quests[20] = new Quest("A Gift of Nightshade", 4, 5, 410);
    quests[21] = new Quest("Lynel Safari", 11, 3, 570);
    quests[22] = new Quest("Riddles of Hyrule", 7, 2, 1200);
    quests[23] = new Quest("An Ice Guy", 2, 23, 2100);
    Scheduler schedule = new Scheduler();
    quests = schedule.sortQuests(quests);
    schedule.printQuests(quests);

    ArrayList<Quest> optimalQuests;
    optimalQuests = schedule.findOptimalQuests(quests);
    schedule.printOptimalQuests(optimalQuests);
  }

}
